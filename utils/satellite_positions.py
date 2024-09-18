import os
import time
import pandas as pd
from skyfield.api import load
from skyfield.sgp4lib import Satrec
import requests
import json

# Define constants
CACHE_FILE = 'tle_cache.json'
TIMESTAMP_FILE = 'last_fetch_time.txt'
CACHE_DURATION = 2 * 60 * 60  # 2 hours in seconds

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
    return json_data

def read_last_fetch_time():
    if os.path.exists(TIMESTAMP_FILE):
        with open(TIMESTAMP_FILE, 'r') as file:
            return float(file.read().strip())
    return 0

def write_last_fetch_time(timestamp):
    with open(TIMESTAMP_FILE, 'w') as file:
        file.write(str(timestamp))

def load_cached_data():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as file:
            return file.read()
    return None

def save_cache(data):
    with open(CACHE_FILE, 'w') as file:
        file.write(data)

def fetch_data_if_needed():
    current_time = time.time()
    last_fetch_time = read_last_fetch_time()
    
    if current_time - last_fetch_time > CACHE_DURATION:
        # Fetch new data and update cache
        print("Fetching new TLE data...")
        json_data = fetch_and_convert_tle_data()
        save_cache(json_data)
        write_last_fetch_time(current_time)
        return json_data
    else:
        # Return cached data
        print("Returning cached TLE data...")
        return load_cached_data()

def dict_list_to_tuples(parsed_dict):
    return [(d['name'], d['line1'], d['line2']) for d in parsed_dict]