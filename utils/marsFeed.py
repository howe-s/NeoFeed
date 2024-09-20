from flask import Flask, request, jsonify

def mars():

    # Respond with some data
    response = {
        'message': f'Hello, World!',
        'status': 'success'
    }
    
    return response