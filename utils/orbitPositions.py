from skyfield.constants import AU_KM
from skyfield.api import load

def get_planet_positions():
    # Load the planetary ephemeris data
    ts = load.timescale()
    planets = load('de421.bsp')  # Load DE421 ephemeris data

    # Define the timescale and current time
    t = ts.now()

    # Get the planets
    sun = planets['sun']
    mercury = planets['mercury']
    venus = planets['venus']
    earth = planets['earth']
    mars = planets['mars']
    jupiter = planets['jupiter barycenter']
    saturn = planets['saturn barycenter']
    uranus = planets['uranus barycenter']
    neptune = planets['neptune barycenter']

    # Get current positions
    def get_position(planet):
        pos = planet.at(t).position.au  # Position in astronomical units
        return [pos[0] * AU_KM, pos[1] * AU_KM, pos[2] * AU_KM]
    
    positions = {
        'Sun': [0, 0, 0],
        'Mercury': get_position(mercury),
        'Venus': get_position(venus),
        'Earth': get_position(earth),
        'Mars': get_position(mars),
        'Jupiter': get_position(jupiter),
        # 'Saturn': get_position(saturn),
        # 'Uranus': get_position(uranus),
        # 'Neptune': get_position(neptune),
    }
    return positions
