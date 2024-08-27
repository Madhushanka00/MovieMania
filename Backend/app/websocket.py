from flask_socketio import emit
from . import socketio

@socketio.on('connect')
def handle_connect():
    emit('response', {'message': 'Connected to the server!'})

@socketio.on('get_movies')
def handle_get_movies():
    emit('response', {'message': 'Here are the movies...'})