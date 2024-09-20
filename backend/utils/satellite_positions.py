import os
import time
import json
import requests

# Define constants
CACHE_FILE = 'tle_cache.json'
TIMESTAMP_FILE = 'last_fetch_time.txt'
CACHE_DURATION = 24 * 60 * 60  # 24 hours in seconds

def fetch_tle_data():
    url = "https://www.celestrak.com/NORAD/elements/stations.txt"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text.strip()
    except requests.RequestException as e:
        print(f"Error fetching TLE data: {e}")
        return ""

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
    if tle_text:
        tle_entries = parse_tle_data(tle_text)
        json_data = convert_to_json(tle_entries)
        return json_data
    return None

def read_last_fetch_time():
    if os.path.exists(TIMESTAMP_FILE):
        try:
            with open(TIMESTAMP_FILE, 'r') as file:
                return float(file.read().strip())
        except ValueError:
            return 0
    return 0

def write_last_fetch_time(timestamp):
    try:
        with open(TIMESTAMP_FILE, 'w') as file:
            file.write(str(timestamp))
    except IOError as e:
        print(f"Error writing timestamp: {e}")

def load_cached_data():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, 'r') as file:
                return file.read()
        except IOError as e:
            print(f"Error reading cache file: {e}")
    return None

def save_cache(data):
    try:
        with open(CACHE_FILE, 'w') as file:
            file.write(data)
    except IOError as e:
        print(f"Error saving cache file: {e}")

def fetch_data_if_needed():
    current_time = time.time()
    last_fetch_time = read_last_fetch_time()
    
    if current_time - last_fetch_time > CACHE_DURATION:
        # Fetch new data and update cache
        print("Fetching new TLE data...")
        json_data = fetch_and_convert_tle_data()
        if json_data:
            save_cache(json_data)
            write_last_fetch_time(current_time)
        return json_data
    else:
        # Return cached data
        print("Returning cached TLE data...")
        return load_cached_data()

def dict_list_to_tuples(parsed_dict):
    return [
        (
            d.get('name', ''),
            d.get('line1', ''),
            d.get('line2', ''),
            # These placeholders need actual parsing if they are required
            d.get('line1_line_number', ''),
            d.get('line1_catalog_number', ''),
            d.get('line1_classification', ''),
            d.get('line1_launch_year', ''),
            d.get('line1_julian_date', ''),
            d.get('line1_first_derivative', ''),
            d.get('line1_second_derivative', ''),
            d.get('line1_drag_term', ''),
            d.get('line1_ephemeris_type', ''),
            d.get('line1_checksum', ''),
            d.get('line2_line_number', ''),
            d.get('line2_catalog_number', ''),
            d.get('line2_inclination', ''),
            d.get('line2_raan', ''),
            d.get('line2_eccentricity', ''),
            d.get('line2_argument_of_perigee', ''),
            d.get('line2_mean_anomaly', ''),
            d.get('line2_mean_motion', '')
        ) 
        for d in parsed_dict
    ]
