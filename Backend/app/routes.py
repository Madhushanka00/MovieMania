from flask import Blueprint, jsonify, current_app,request
import requests

main = Blueprint('main', __name__)

@main.route('/movies/popular', methods=['GET'])
def get_popular_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1')
    return jsonify(response.json())

@main.route('/movies/top-rated', methods=['GET'])
def get_top_rated_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}&language=en-US&page=1')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())

@main.route('/getDetails', methods=['GET'])
def get_movie_details():
    # Get the movieId from the query parameters
    movie_id = request.args.get('movieId')
    
    # Check if the movieId is provided
    if not movie_id:
        return jsonify({"error": "movieId is required"}), 400

    # Get the TMDB API key from the configuration
    api_key = current_app.config['TMDB_API_KEY']
    
    # Make the API request to TMDB to get movie details
    response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
    
    # Return the results from TMDB API as JSON
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to fetch movie details"}), response.status_code