# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.neoFeed import neo
from config import API_KEY
from utils.neoObject import neoObject

app = Flask(__name__)
CORS(app)

@app.route('/api/neo', methods=['GET'])
def neoData():
    data = neo()  # Call the function and fetch data

    return jsonify(data=data)  # Include data in the response

# Global variable to store data
stored_data = {}

@app.route('/api/neoObject', methods=['POST'])
def neo_object():
    if request.method == 'POST':
        data = request.get_json()
        identifier = data['id']
        data = neoObject(identifier)
        stored_data['data'] = data
        return jsonify(data)
    
@app.route('/api/neoObject', methods=['GET'])
def neo_object_get():
    if request.method == 'GET':
        if stored_data:
            return jsonify(stored_data)
        else: 
            return jsonify({'message from the backend': 'GET request received!', 'data': 'test'})

if __name__ == '__main__':
    app.run(debug=True)
