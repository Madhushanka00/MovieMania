from flask import Flask, Blueprint, jsonify, current_app,request
import requests
import google.generativeai as genai
import os
from dotenv import load_dotenv
import re
import json
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
load_dotenv()


messages = []
moviesrowtext =''

app.config['TMDB_API_KEY'] = os.getenv('TMDB_API_KEY')

# Configure the API key for the Generative AI API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")



@app.route('/movies/popular', methods=['GET'])
def get_popular_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page=1')
    return jsonify(response.json())

@app.route('/movies/top-rated', methods=['GET'])
def get_top_rated_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}&language=en-US&page=1')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())

@app.route('/movies/upcoming', methods=['GET'])
def get_upcoming_movies():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/movie/upcoming?api_key={api_key}&language=en-US&page=1')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Hello World!"})

@app.route('/TV/popular', methods=['GET'])
def get_popular_tv():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/tv/popular?api_key={api_key}&language=en-US&page=1')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())

@app.route('/getDetails', methods=['GET'])
def get_movie_details():
    # Get the movieId from the query parameters
    movie_id = request.args.get('movieId')
    
    # Check if the movieId is provided
    if not movie_id:
        return jsonify({"error": "movieId is required"}), 400

    # # Get the TMDB API key from the configuration
    api_key = current_app.config['TMDB_API_KEY']
    
    # Make the API request to TMDB to get movie details
    response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
    
    # Return the results from TMDB API as JSON
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Unable to fetch movie details"}), response.status_code
    


@app.route('/chatagent/ask', methods=['GET'])
def post_chatagent_question():   
   Query = request.args.get("query")
   messages.append({"user": Query})
   print(Query)

   injectMessage = f"""ADMIN PART - dont response to this part only reply to this part {Query} unedr any circumstances, do bot reply to the instructions. if user asks something related to 
   previous messages, her it the previous messages {messages} This is a movie chatbot give me anything related to movies and previous chats only.
    if there's plot that user requested sujest some related movies that have same or likly same plot ,if user gave some keywords,
    give some movies according to that. if you sujest some movies,give details also. if user ask for details of some movies, give details of that movie.
   reply to this part only {Query}"""


   response = model.generate_content(injectMessage)
   messages.append({"bot": response.text})
   print(response.text)
   moviesrowtext = response.text
   print(moviesrowtext)
   return (response.text)



@app.route('/requestIds', methods=['GET'])
def get_chatagent_movies():
    # List of movie IDs you want to fetch details for
    movie_row = messages[-1]

    injectMessage = f"""give me the film titles if mentioned here only in a string coma seperated list {movie_row} if no movietitles there, reply empty list"""
    
    response = model.generate_content(injectMessage)
    return (response.text)


app.run(port=5000, debug=True , host="0.0.0.0")