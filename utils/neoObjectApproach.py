import requests
from flask import jsonify
from config import API_KEY
import json
import time

def neoObject(identifier): 
    # print(identifier)
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{identifier}'
    params = {
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}   
    response = requests.get(url, params=params, headers=headers)
    response = response.json()

    return response

# all_approaches = []

def neoObjectDataStructure(identifier):
    data = neoObject(identifier)
    all_approaches = []
    past_approaches = []
    future_approaches = []
    orbital_data = []
    current_epoch_ms = int(time.time() * 1000)
    # Collect all close_approach_data entries
    for approach in data['close_approach_data']:
            all_approaches.append(approach)
            if approach['epoch_date_close_approach'] >  current_epoch_ms:
                future_approaches.append(approach)
            if approach['epoch_date_close_approach'] <  current_epoch_ms:
                past_approaches.append(approach)
    
    orbital_data.append(data['orbital_data'])
    # print(orbital_data)
        
    # Sort the all_approaches list by epoch_date_close_approach
    # sorted_approaches = sorted(all_approaches, key=lambda x: x['epoch_date_close_approach'], reverse=True)

    
    combined_data = {
    "sorted_approaches": all_approaches,
    "future_approaches": future_approaches,
    "past_approaches": past_approaches,
    "orbital_data": orbital_data
    }

    result = json.dumps(combined_data, indent=2)

    return result


