import requests
from flask import jsonify
from config import API_KEY
import json
import time
from utils.neoOrbitImage import plot_orbit

def neoObject(identifier): 
    # print(identifier)
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{identifier}'
    params = {
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}   
    response = requests.get(url, params=params, headers=headers)
    response = response.json()
    print('API HIT')

    return response

# all_approaches = []

def neoObjectDataStructure(identifier):
    print('neoObjectDataStructure')
    data = neoObject(identifier)
    # print('data', data)
    all_approaches = []
    past_approaches = []
    future_approaches = []
    orbital_data = []
    orbiting_body = []
    current_epoch_ms = int(time.time() * 1000)
    # Collect all close_approach_data entries
    for approach in data['close_approach_data']:
            orbiting_body.append(approach['orbiting_body'], )
            all_approaches.append(approach)
            if approach['epoch_date_close_approach'] >  current_epoch_ms:
                future_approaches.append(approach)
            if approach['epoch_date_close_approach'] <  current_epoch_ms:
                past_approaches.append(approach)
    
    orbital_data.append(data['orbital_data'])
    
    # raw_orbital_image = plot_orbit(orbital_data, orbiting_body)
    # print(type(plot_orbit(orbital_data, orbiting_body)))
    # converted_orbital_image = json.dumps(plot_orbit(orbital_data))
    selectedDate = None

    converted_orbital_image = plot_orbit(orbital_data, selectedDate)
    
    # print(converted_orbital_image)
    # print(orbital_image)
    # # To save the figure as an image file (e.g., PNG):
    # orbital_image.write_image("orbit_plot.png")
    
        
    # Sort the all_approaches list by epoch_date_close_approach
    # sorted_approaches = sorted(all_approaches, key=lambda x: x['epoch_date_close_approach'], reverse=True)

    
    combined_data = {
    "object_id": identifier,
    "sorted_approaches": all_approaches,
    "future_approaches": future_approaches,
    "past_approaches": past_approaches,
    "orbital_data": orbital_data,
    "orbital_image": converted_orbital_image
    }

    result = json.dumps(combined_data, indent=2)
    test = json.loads(result)

    # Print only the object_id
    print(test["object_id"])

    return result


