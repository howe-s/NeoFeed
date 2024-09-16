# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.neoFeed import neo
from config import API_KEY
from utils.neoObjectApproach import neoObjectDataStructure

app = Flask(__name__)
CORS(app)

@app.route('/api/neo', methods=['GET', 'POST'])
def neoData():
    ## we can make these modular
    startDate = '2024-09-07'
    endDate =   '2024-09-08'
    data = neo(startDate, endDate)  # Call the function and fetch data

    return jsonify(data=data)  # Include data in the response

@app.route('/api/neoObject', methods=['POST', 'GET'])
def neo_identifier():
    response = request.get_json()
    identifier = response['id']
    data = neoObjectDataStructure(identifier)
    if data:
        # print(type(data))
        # return data
        # print(jsonify(data))
        return jsonify(data=data, identifier=identifier) 
    else:
        return jsonify({"error": "No data found"}), 404


if __name__ == '__main__':
    app.run(debug=True)
