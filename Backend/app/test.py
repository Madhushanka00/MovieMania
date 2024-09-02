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


messages = ['']
moviesrowtext =''
respondedmovies =[]

app.config['TMDB_API_KEY'] = os.getenv('TMDB_API_KEY')

# Configure the API key for the Generative AI API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def formatTxtx(movie_input):
    # Handle input strings by converting them to a common format
    if isinstance(movie_input, str):
        tempFormatedarr =[]
        formatted_movies =[]
        # formatted_movies = [re.sub(r'\s*\(\d{4}\)', '', movie) for movie in movie_input]
        # Remove curly braces or brackets if any
        movie_input = movie_input.replace("{", "").replace("}", "")
        movie_input = movie_input.replace("[", "").replace("]", "")
        
        # Split the string by commas but keep the parentheses together
        # movies = re.findall(r'"([^"]+)"|\(([^)]+)\)', movie_input)
        # tempFormatedarr = [m[0] if m[0] else m[1] for m in movies]
        movies = re.split(r',\s*', movie_input)
        for item in movies:
            formatted_movies.append(re.sub(r'\s*\(\d{4}\)', '', item))
        # Split the string into movie titles
        movie_titles = re.split(r',\s*', movie_input)
        
        # Remove any leading or trailing quotes
        movie_titles = [title.strip('"\'' ) for title in movie_titles]
        
    elif isinstance(movie_input, list) or isinstance(movie_input, set):
        tempFormatedarr =[]
        for item in movie_input:
        # If it's already a list or set, we just need to format it properly
            tempFormatedarr.append(re.sub(r'\s*\(\d{4}\)', '', item))
        # print('already a list or set, we just need to format it properly')
        formatted_movies = tempFormatedarr
        
    else:
        raise ValueError("Unsupported input type")
    
    # formatted_movies = [re.sub(r'\s*\(\d{4}\)', '', movie) for movie in formatted_movies]

    
    return formatted_movies

def search_movie_on_tmdb(movie_title):
    url = f'https://api.themoviedb.org/3/search/movie'
    params = {
        'api_key': API_KEY,
        'query': movie_title
    }
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        results = response.json().get('results', [])
        if results:
            return results[0]  # Return the first search result
        else:
            return None
    else:
        print(f"Error: Unable to search for '{movie_title}'. HTTP Status code: {response.status_code}")
        return None



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

@app.route('/tv/top-rated', methods=['GET'])
def get_top_rated_tv():
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/tv/top_rated?api_key={api_key}&language=en-US&page=1')
    
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
    type = request.args.get('type')
    
    # Check if the movieId is provided
    if not movie_id:
        return jsonify({"error": "movieId is required"}), 400

    # # Get the TMDB API key from the configuration
    api_key = current_app.config['TMDB_API_KEY']
    
    if type == 'movie':
    # Make the API request to TMDB to get movie details
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
    else:
        response = requests.get(f'https://api.themoviedb.org/3/tv/{movie_id}?api_key={api_key}&language=en-US')
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
#    print(response)
   messages.append({"bot": response.text})
   print(response.text)
   moviesrowtext = response.text
   print(moviesrowtext)
   
   return (response.text)



@app.route('/requestIds', methods=['GET'])
def get_chatagent_movies():
    global respondedmovies 
    # List of movie IDs you want to fetch details for
    movie_row = messages[-1]

    injectMessage = f"""give me the film titles if mentioned here only in a string coma seperated list {movie_row} if no movietitles there, reply empty list"""
    
    response = model.generate_content(injectMessage)
    # print(response)
    respondedmovies=formatTxtx(response.text)
    print(respondedmovies, len(respondedmovies))
    return (response.text)

@app.route('/chatMovieDetails', methods = ['GET'])
def get_chatagent_movielist():
    currentList =[]
    global respondedmovies 
    # if len(respondedmovies):
    #     api_key = current_app.config['TMDB_API_KEY']
    #     for movies in respondedmovies:
    #         response = requests.get(f'https://api.themoviedb.org/3/search/movie?query={movies}&api_key={api_key}&include_adult=false&language=en-US&page=1')
    #         if response.status_code == 200:
    #             print(response)
    #             moviedetails= jsonify(response.json())
    #             print(moviedetails)
    #             currentList.append(moviedetails)
    #         else:
    #             print (jsonify({"error": "Unable to fetch movie details"}), response.status_code)
    #     return currentList

    # else:
    #     return jsonify({"error": "Unable to fetch movie details"}), response.status_code
    if len(respondedmovies):  # Assuming respondedmovies is defined elsewhere
        api_key = current_app.config['TMDB_API_KEY']
        # print(api_key)
        for movie in respondedmovies:
            response = requests.get(
                f'https://api.themoviedb.org/3/search/movie',
                params={
                    'query': movie,
                    'api_key': api_key,
                    'include_adult': 'false',
                    'language': 'en-US',
                    'page': 1
                }
            )
            if response.status_code == 200:
                movie_details = response.json()  # Extract JSON from the Response object
                if movie_details.get('results'):  # Check if there are results
                    currentList.append(movie_details['results'][0])  # Append the first result
            else:
                print(f"Error fetching details for {movie}: {response.status_code}")
        print(currentList)
        return jsonify(currentList)  # Return the list of movie details as JSON

    else:
        return jsonify({"error": "No movies to fetch details for"}), 400  
    
    


app.run(port=5000, debug=True , host="0.0.0.0")