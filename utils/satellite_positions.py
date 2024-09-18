import pandas as pd
from skyfield.api import load
from skyfield.sgp4lib import Satrec

import requests
import json

def fetch_tle_data():
    url = "https://www.celestrak.com/NORAD/elements/stations.txt"
    response = requests.get(url)
    print(response)
    response.raise_for_status()
    return response.text.strip()

def parse_tle_data(tle_text):
    lines = tle_text.splitlines()
    tle_entries = []

    for i in range(0, len(lines), 3):
        if i + 2 < len(lines):
            name = lines[i].strip()
            line1 = lines[i + 1].strip()
            line2 = lines[i + 2].strip()
            tle_entries.append({
                'name': name,
                'line1': line1,
                'line2': line2
            })
    
    return tle_entries

def convert_to_json(tle_entries):
    return json.dumps(tle_entries, indent=4)

def fetch_and_convert_tle_data():
    tle_text = fetch_tle_data()
    tle_entries = parse_tle_data(tle_text)
    json_data = convert_to_json(tle_entries)
    # print(json_data)
    return json_data

