# utils/neoFeed.py
import requests
from config import API_KEY

def neo():
    url = 'https://api.nasa.gov/neo/rest/v1/feed'
    params = {
        'start_date': '2015-09-07',
        'end_date': '2015-09-08',
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}

    response = requests.get(url, params=params, headers=headers)
    if response.status_code == 200:
        raw_data = response.json()
        
        # Prepare a list to store simplified objects
        simplified_data = []

        # Iterate through the near_earth_objectss
        for date, objects in raw_data['near_earth_objects'].items():
            for obj in objects:
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