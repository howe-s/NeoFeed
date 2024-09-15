# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.neoFeed import neo
from config import API_KEY
from utils.neoObject import neoObjectDataStructure

app = Flask(__name__)
CORS(app)

@app.route('/api/neo', methods=['GET'])
def neoData():
    data = neo()  # Call the function and fetch data

    return jsonify(data=data)  # Include data in the response
data = {}
@app.route('/api/neoObject', methods=['POST', 'GET'])
def neo_identifier():
    data = request.get_json()
    identifier = data['id']
    data = neoObjectDataStructure(identifier)
    print(type(data))
    print(data)
    if data:
        # print(data)
        return jsonify(data) # Return the fetched data immediately
    else:
        return None

if __name__ == '__main__':
    app.run(debug=True)
