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

all_approaches = []

def neoObjectDataStructure(identifier):  
    data = neoObject(identifier)    
    for approach in data['close_approach_data']:        
        all_approaches.append(approach)
 
    result = json.dumps(all_approaches, indent=2)

    return result


