# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from utils.neoFeed import neo

app = Flask(__name__)
CORS(app)

@app.route('/api/neo', methods=['GET'])
def FlaskHello():
    data = neo()  # Call the function and fetch data

    return jsonify(data=data)  # Include data in the response

if __name__ == '__main__':
    app.run(debug=True)
