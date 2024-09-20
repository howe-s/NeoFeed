
from flask import request, jsonify
from utils.neoObjectApproach import neoObject

def neoObjectData(identifier):  
    stored_data = neoObject(identifier)
    # print('get route', identifier)
    if stored_data:
        return stored_data
        # return jsonify({'data': stored_data})  # Return the stored data
    else:
        # Default response when no data is available
        return jsonify({'message': 'No data available', 'data': 'data'})
