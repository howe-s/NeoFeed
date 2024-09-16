# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.neoFeed import neo
from config import API_KEY
from utils.neoObjectApproach import neoObjectDataStructure
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/api/neo', methods=['GET', 'POST'])
def neoData():   
    # response = request.get_json()
    if request.method == 'POST':
        #PASS DATA TO USERINPUTDATES.PY

        #EXTRACT THE DATES

        return None
    else:
        # Get Yesterday and the day before     
        today = datetime.now()
        yesterday = today - timedelta(days=1)
        yesterday_date = yesterday.strftime('%Y-%m-%d')

        two_days_ago = today - timedelta(days=2)
        two_days_ago_date = two_days_ago.strftime('%Y-%m-%d')

        start_date = yesterday_date
        end_date = two_days_ago_date
        # Pass dates to neo.py
        data = neo(start_date, end_date)  # Call the function and fetch data

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
