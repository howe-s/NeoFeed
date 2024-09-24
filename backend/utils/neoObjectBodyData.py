import requests
from flask import jsonify
from backend.config import API_KEY
import json
# Unused
def neoObjectBodyData(identifier): 
    
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{identifier}'
    params = {
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}   
    response = requests.get(url, params=params, headers=headers)
    response = response.json()
    

    return response







