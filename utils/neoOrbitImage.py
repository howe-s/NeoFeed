import numpy as np
import plotly.graph_objects as go
from skyfield.constants import AU_KM
from scipy.constants import G
from math import pi, sqrt, cos, sin
from flask import Flask, jsonify

# Constants
mu = 1.32712440018e11  # Gravitational parameter of the Sun in km^3/s^2

def plot_orbit(orbital_data_list):
    fig = go.Figure()

    for orbital_data in orbital_data_list:
        # Extract orbital parameters from the data
        a = float(orbital_data['semi_major_axis']) * AU_KM  # Semi-major axis in km
        e = float(orbital_data['eccentricity'])  # Eccentricity
        i = float(orbital_data['inclination']) * (pi / 180)  # Inclination in radians
        omega = float(orbital_data['ascending_node_longitude']) * (pi / 180)  # Longitude of ascending node in radians
        w = float(orbital_data['perihelion_argument']) * (pi / 180)  # Argument of perihelion in radians
        M0 = float(orbital_data['mean_anomaly']) * (pi / 180)  # Mean anomaly at epoch in radians
        period = float(orbital_data['orbital_period']) * 86400  # Orbital period in seconds

        # Generate time values over one orbit period
        num_points = 500
        time = np.linspace(0, period, num_points)

        # Calculate mean motion
        n = sqrt(mu / a**3)  # Mean motion (radians per second)

        # Calculate position over time
        r_x, r_y, r_z = [], [], []
        for t in time:
            # Mean anomaly
            M = M0 + n * t
            # Solve Kepler's equation for Eccentric Anomaly using Newton's method
            E = M
            for _ in range(10):
                E = E - (E - e * sin(E) - M) / (1 - e * cos(E))
            # True anomaly
            nu = 2 * np.arctan2(sqrt(1 + e) * sin(E / 2), sqrt(1 - e) * cos(E / 2))
            # Distance from focus (Sun) to object
            r = a * (1 - e * cos(E))
            # Position in orbital plane
            x_orb = r * cos(nu)
            y_orb = r * sin(nu)

            # Rotate to celestial coordinates
            x = (cos(omega) * cos(w + nu) - sin(omega) * sin(w + nu) * cos(i)) * r
            y = (sin(omega) * cos(w + nu) + cos(omega) * sin(w + nu) * cos(i)) * r
            z = (sin(i) * sin(w + nu)) * r

            r_x.append(x)
            r_y.append(y)
            r_z.append(z)

        # Add each orbit path to the plot
        fig.add_trace(go.Scatter3d(
            x=r_x, y=r_y, z=r_z,
            mode='lines',
            name=f'Orbit Path {orbital_data["orbit_id"]}'
        ))

    # Plot Earth's position at the origin
    fig.add_trace(go.Scatter3d(
        x=[0], y=[0], z=[0],
        mode='markers',
        marker=dict(size=5, color='blue'),
        name='Earth'
    ))

    # Set labels and title
    fig.update_layout(
        scene=dict(
            xaxis_title='X (km)',
            yaxis_title='Y (km)',
            zaxis_title='Z (km)',
            aspectmode='data'  # Keep aspect ratio of the plot data
        ),
        title='Orbits of Objects around the Sun'
    )
    # fig.show()
    # Convert the figure to JSON
    fig_json = fig.to_dict()

    return fig_json
