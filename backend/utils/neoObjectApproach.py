import requests
from flask import jsonify
from config import API_KEY
import json
import time
from utils.neoOrbitImage import plot_orbit

# Call NASA API passing user selected NEO identifier 
def neoObject(identifier): 
    
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{identifier}'
    params = {
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}   
    response = requests.get(url, params=params, headers=headers)
    response = response.json()
    print('API HIT')

    return response

# Parse and construct userSelected NEO data
def neoObjectDataStructure(identifier):
    # Call API
    data = neoObject(identifier)
    # Construct initial lists for desired data  
    all_approaches, past_approaches, future_approaches, orbital_data, orbiting_body = ([] for _ in range(5))    
    current_epoch_ms = int(time.time() * 1000)
   
    for approach in data['close_approach_data']:           
            orbiting_body.append(approach['orbiting_body'], )           
            all_approaches.append(approach)
           
            if approach['epoch_date_close_approach'] >  current_epoch_ms:
                future_approaches.append(approach)
           
            if approach['epoch_date_close_approach'] <  current_epoch_ms:
                past_approaches.append(approach)
    # NEO orbital data for Chart
    orbital_data.append(data['orbital_data'])   
    
    # Default State 
    selectedDate = None
    # neoOrbitImage.py - Returns a pre-rendered, deconstructed Plotly for React-Plotly
    converted_orbital_image = plot_orbit(orbital_data, selectedDate)       

    # Construct data for userSelected NEO Object
    combined_data = {
    "object_id": identifier,
    "sorted_approaches": all_approaches,
    "future_approaches": future_approaches,
    "past_approaches": past_approaches,
    "orbital_data": orbital_data,
    "orbital_image": converted_orbital_image
    }

    result = json.dumps(combined_data, indent=2)
    # Returns a JSON-formatted string representation of the dictionary
    return result


