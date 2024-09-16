import requests
from flask import jsonify
from config import API_KEY
import json

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
    # print(data)
    all_approaches = []
    orbital_data = []
    # Collect all close_approach_data entries
    for approach in data['close_approach_data']:
        all_approaches.append(approach)
    for orbit in data['orbital_data']:
        orbital_data.append(orbit)
        # print(orbit)
        
    # Sort the all_approaches list by epoch_date_close_approach
    sorted_approaches = sorted(all_approaches, key=lambda x: x['epoch_date_close_approach'], reverse=True)

    
    combined_data = {
    "sorted_approaches": sorted_approaches,
    "orbital_data": orbital_data
    }

    result = json.dumps(combined_data, indent=2)

    return result


