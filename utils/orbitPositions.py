from skyfield.constants import AU_KM
from skyfield.api import load

def get_planet_positions():
    # Load the planetary ephemeris data
    ts = load.timescale()
    planets = load('de421.bsp')  # Load DE421 ephemeris data

    # Define the timescale and current time
    t = ts.now()

    # Get the planets
    earth, venus, mars = planets['earth'], planets['venus'], planets['mars']

    # Get current positions
    earth_pos = earth.at(t).position.au  # Position in astronomical units
    venus_pos = venus.at(t).position.au
    mars_pos = mars.at(t).position.au

    # Convert AU to km
    positions = {
        'Sun': [0, 0, 0],
        'Earth': [earth_pos[0] * AU_KM, earth_pos[1] * AU_KM, earth_pos[2] * AU_KM],
        'Venus': [venus_pos[0] * AU_KM, venus_pos[1] * AU_KM, venus_pos[2] * AU_KM],
        'Mars': [mars_pos[0] * AU_KM, mars_pos[1] * AU_KM, mars_pos[2] * AU_KM],
    }
    return positions
