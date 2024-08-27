from flask import Blueprint, jsonify, current_app
import requests

main = Blueprint('main', __name__)

@main.route('/movies/popular', methods=['GET'])
def get_popular_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1')
    return jsonify(response.json())