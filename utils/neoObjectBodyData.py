import requests
from flask import jsonify
from config import API_KEY
import json

def neoObjectBodyData(identifier): 
    # print(identifier)
    url = f'https://api.nasa.gov/neo/rest/v1/neo/{identifier}'
    params = {
        'api_key': API_KEY 
    }
    headers = {'accept': 'application/json'}   
    response = requests.get(url, params=params, headers=headers)
    response = response.json()
    print(response['data'])

    return response

# all_approaches = []





