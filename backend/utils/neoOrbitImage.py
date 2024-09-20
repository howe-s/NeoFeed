import numpy as np
import plotly.graph_objects as go
from skyfield.constants import AU_KM
from skyfield.api import load
from scipy.constants import G
from math import pi, sqrt, cos, sin
from flask import Flask, jsonify
# from backend.utils.satellite_positions import fetch_and_convert_tle_data
# from backend.utils.satellite_positions import dict_list_to_tuples
from backend.utils.planetPositions import get_planet_positions
import json
import os
import time
import pandas as pd

# Constants
mu_sun = 1.32712440018e11  # Gravitational parameter of the Sun in km^3/s^2

from skyfield.api import load

def plot_orbit(orbital_data_list, selectedDate):
    print('orbital_data_list', type(orbital_data_list))
    fig = go.Figure()
    selectedTime = 'placeholder'

    # Get positions for the Sun and planets, with orbit trajectories
    planet_positions = get_planet_positions(selectedDate)

    # Define planet diameters for proportional sizing (in km)
    planet_sizes = {
        'Sun': 50000,  
        'Mercury': 4883,
        'Earth': 12742, 
        'Venus': 12104,
        'Mars': 6779,
        'Moon': 3474
    }

    # Plot positions of the Sun and planets with proportional sizes
    for body, pos in planet_positions.items():
        fig.add_trace(go.Scatter3d(
            x=[pos[0]], y=[pos[1]], z=[pos[2]],
            mode='markers',
            marker=dict(
                size=planet_sizes[body] / 2000,  # Scale down the size for visualization
                color='yellow' if body == 'Sun' else 'blue' if body == 'Earth' else 'orange'
            ),
            name=body
        ))

    # Add each object's orbit path to the plot
    for orbital_data in orbital_data_list:
        a = float(orbital_data['semi_major_axis']) * AU_KM  # Semi-major axis in km
        e = float(orbital_data['eccentricity'])  # Eccentricity
        i = float(orbital_data['inclination']) * (pi / 180)  # Inclination in radians
        omega = float(orbital_data['ascending_node_longitude']) * (pi / 180)  # Longitude of ascending node in radians
        w = float(orbital_data['perihelion_argument']) * (pi / 180)  # Argument of perihelion in radians
        M0 = float(orbital_data['mean_anomaly']) * (pi / 180)  # Mean anomaly at epoch in radians
        period = float(orbital_data['orbital_period']) * 86400  # Orbital period in seconds

        num_points = 500
        time = np.linspace(0, period, num_points)
        n = sqrt(mu_sun / a**3)

        r_x, r_y, r_z = [], [], []
        for t in time:
            M = M0 + n * t
            E = M
            for _ in range(10):
                E = E - (E - e * sin(E) - M) / (1 - e * cos(E))
            nu = 2 * np.arctan2(sqrt(1 + e) * sin(E / 2), sqrt(1 - e) * cos(E / 2))
            r = a * (1 - e * cos(E))
            x_orb = r * cos(nu)
            y_orb = r * sin(nu)

            x = (cos(omega) * cos(w + nu) - sin(omega) * sin(w + nu) * cos(i)) * r
            y = (sin(omega) * cos(w + nu) + cos(omega) * sin(w + nu) * cos(i)) * r
            z = (sin(i) * sin(w + nu)) * r

            r_x.append(x)
            r_y.append(y)
            r_z.append(z)

        fig.add_trace(go.Scatter3d(
            x=r_x, y=r_y, z=r_z,
            mode='lines',
            name=f'Orbit Path {orbital_data["orbit_id"]}'
        ))

    # Set labels, title, and background color
    fig.update_layout(
    scene=dict(
        xaxis_title='X (km)',
        yaxis_title='Y (km)',
        zaxis_title='Z (km)',
        aspectmode='data',  # Keeps the aspect ratio consistent
        xaxis=dict(backgroundcolor="black", tickangle=45, tickfont=dict(size=10)),  # Adjust tick angle and font size
        yaxis=dict(backgroundcolor="black", tickangle=45, tickfont=dict(size=10)),  # Adjust tick angle and font size
        zaxis=dict(backgroundcolor="black", tickangle=45, tickfont=dict(size=10))  # Adjust tick angle and font size
    ),
    paper_bgcolor="black",  # Background outside the plot area
    plot_bgcolor="black",  # Background inside the plot area
    font=dict(color='white', size=12),  # Adjust font size for better visibility
    margin=dict(l=50, r=50, b=50, t=50),  # Adjust margins for responsiveness
    autosize=True,  # Adjust plot size dynamically based on container
    # width=800,  # Set a default width for larger screens
    # height=600,  # Set a default height for larger screens
)

    # Convert the figure to JSON
    fig_json = fig.to_dict()
    return fig_json
