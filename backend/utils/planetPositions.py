from skyfield.constants import AU_KM
from skyfield.api import load
from datetime import datetime

def get_planet_positions(selectedDate):
    print('test', selectedDate)
    print(type(selectedDate))
    # Load the planetary ephemeris data
    ts = load.timescale()
    planets = load('de421.bsp')  # Load DE421 ephemeris data

    if selectedDate == None:
        # Define the timescale and current time
        t = ts.now()
    else:
        t = ts.now()        
        # # Sample date string
        # date_str = selectedDate

        # # Define the format of the input date string
        # date_format = '%Y-%b-%d %H:%M'

        # # Convert the string to a datetime object
        # dt = datetime.strptime(date_str, date_format)

        # print(dt)
        # print(selectedDate)

    # Get the planets and the moon
    mercury = planets['mercury']
    earth = planets['earth']
    venus = planets['venus']
    mars = planets['mars']
    moon = planets['moon']

    # Get current positions
    mercury_pos = mercury.at(t).position.au
    earth_pos = earth.at(t).position.au  # Position in astronomical units
    venus_pos = venus.at(t).position.au
    mars_pos = mars.at(t).position.au
    moon_pos = moon.at(t).position.au

    # Convert AU to km
    positions = {
        'Sun': [0, 0, 0],
        'Mercury': [mercury_pos[0] * AU_KM, mercury_pos[1] * AU_KM, mercury_pos[2] * AU_KM],
        'Earth': [earth_pos[0] * AU_KM, earth_pos[1] * AU_KM, earth_pos[2] * AU_KM],
        'Venus': [venus_pos[0] * AU_KM, venus_pos[1] * AU_KM, venus_pos[2] * AU_KM],
        'Mars': [mars_pos[0] * AU_KM, mars_pos[1] * AU_KM, mars_pos[2] * AU_KM],
        'Moon': [moon_pos[0] * AU_KM, moon_pos[1] * AU_KM, moon_pos[2] * AU_KM],
    }
    return positions
