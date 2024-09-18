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
    if request.method == 'POST':
        response = request.get_json()
        start_date_str = response.get('start_date')
        end_date_str = response.get('end_date')
        
        # Validate and convert dates
        if not start_date_str or not end_date_str:
            return jsonify({"error": "Start date and end date are required"}), 400

        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        except ValueError:
            return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400

        data = neo(start_date.strftime('%Y-%m-%d'), end_date.strftime('%Y-%m-%d'))        
        return jsonify(data=data)
    
    if request.method == 'GET':
        # Default to the last 2 days if no date range is provided
        today = datetime.now()
        # yesterday = today - timedelta(days=1)
        # two_days_ago = today - timedelta(days=2)
        start_date = today.strftime('%Y-%m-%d')
        end_date = today.strftime('%Y-%m-%d')
        print('NeoData')
        data = neo(start_date, end_date)
        return jsonify(data=data)


@app.route('/api/neoObject', methods=['POST', 'GET'])
def neo_identifier():
    if request.method == 'POST':
        print('/api/neoObject', 'POST')
        response = request.get_json()
        identifier = response.get('id')
        
        if not identifier:
            return jsonify({"error": "ID is required"}), 400

        data = neoObjectDataStructure(identifier)        
        if data:
            return jsonify(data=data, identifier=identifier)
        else:
            return jsonify({"error": "No data found"}), 404
    else:
        return jsonify({"error": "Method not allowed"}), 405

if __name__ == '__main__':
    app.run(debug=True)
