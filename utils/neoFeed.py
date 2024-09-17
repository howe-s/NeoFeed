# utils/neoFeed.py
import requests
from config import API_KEY
import time

def neo(start_date, end_date):
    url = 'https://api.nasa.gov/neo/rest/v1/feed'
    params = {
        'start_date': start_date,
        'end_date': end_date,
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}

    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        raw_data = response.json()
        
        # Prepare a list to store simplified objects
        simplified_data = []
        current_epoch_ms = int(time.time() * 1000)
        # Iterate through the near_earth_objectss
        for date, objects in raw_data['near_earth_objects'].items():
            # print(objects)
            for obj in objects:
                # print('object print', obj)
                # if obj['close_approach_data'][0].get('epoch_date_close_approach') <  current_epoch_ms:
                # Simplify each object and append it to the simplified_data list
                simplified_data.append({
                    'name': obj.get('name'),
                    'id': obj.get('id'),
                    'absolute_magnitude_h': obj.get('absolute_magnitude_h'),
                    'diameter_min_km': obj['estimated_diameter']['kilometers']['estimated_diameter_min'],
                    'diameter_max_km': obj['estimated_diameter']['kilometers']['estimated_diameter_max'],
                    'approach_date': obj['close_approach_data'][0].get('close_approach_date'),
                    'miss_distance_km': obj['close_approach_data'][0]['miss_distance'].get('kilometers'),
                    'velocity_kmph': obj['close_approach_data'][0]['relative_velocity'].get('kilometers_per_hour'),
                    'is_hazardous': obj.get('is_potentially_hazardous_asteroid'),
                    'nasa_jpl_url': obj.get('nasa_jpl_url'),
                })

            return simplified_data
    else:
        return {'error': 'Failed to fetch data'}