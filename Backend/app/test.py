from flask import Flask, Blueprint, jsonify, current_app,request
import requests
import google.generativeai as genai
import os
from dotenv import load_dotenv
import re
import json
import pickle
import concurrent.futures


from typing import Dict, Text
# import pandas as pd
# import numpy as np
# import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
load_dotenv()


file_path = os.path.join(os.path.dirname(__file__), 'MLmodels', 'Exports', 'movie_list.pkl')

with open('d:/MovieMania/MovieMania/MLmodels/Exports/movie_list.pkl', 'rb') as file:
    # Backend\Assistant.ipynb
    # MLmodels\Exports
    new_df = pickle.load(file)

with open('d:/MovieMania/similarity_list.pkl', 'rb') as file:
    similarity = pickle.load(file)

# print(new_df)

messages = ['']
moviesrowtext =''
respondedmovies =[]

app.config['TMDB_API_KEY'] = os.getenv('TMDB_API_KEY')

# Configure the API key for the Generative AI API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def recommend(movie):
    try:
        # Find the index of the movie in the DataFrame
        index = new_df[new_df['title'] == movie].index[0]
        l =[]
        # Calculate similarity distances and sort them
        distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
        
        # Print the recommended movies
        for i in distances[1:11]:
            l.append(new_df.iloc[i[0]]['title'])
        return l
    except IndexError:
        # If the movie is not found, return a message
        return("404")

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

def fetch_movie_details(movie_id, api_key):
    """Fetch movie details from TMDB API for a single movie_id."""
    response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
    if response.status_code == 200:
        return response.json()
    return None

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
    
@app.route('/genres', methods=['GET'])
def get_genres():
    # movie_id = request.args.get('movieId')
    media_type = request.args.get('media_type')
    print(media_type=="movie")
    
    api_key = current_app.config['TMDB_API_KEY']
    if media_type == 'movie':
        response = requests.get(f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US')
    else:
        response = requests.get(f'https://api.themoviedb.org/3/genre/tv/list?api_key={api_key}&language=en-US')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())

@app.route('/getGenreMovies' , methods=['GET'])
def get_genre_movies():
    genre_id = request.args.get('genreId')
    media_type = request.args.get('media_type')
    api_key = current_app.config['TMDB_API_KEY']
    if media_type == 'movie':
        response = requests.get(f'https://api.themoviedb.org/3/discover/movie?api_key={api_key}&with_genres={genre_id}&language=en-US&page=1')
    else:
        response = requests.get(f'https://api.themoviedb.org/3/discover/tv?api_key={api_key}&with_genres={genre_id}&language=en-US&page=1')
    
    # Return the results from TMDB API as JSON
    return jsonify(response.json())




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
    if len(respondedmovies):  # Assuming respondedmovies is defined elsewhere
        api_key = current_app.config['TMDB_API_KEY']
        # print(api_key)
        for movie in respondedmovies:
            response = requests.get(
                f'https://api.themoviedb.org/3/search/multi',
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
    
@app.route('/searchmovies', methods=['GET'])
def search_movies():
    # Get the search query from the query parameters
    search_query = request.args.get('query')
    
    # Check if the search query is provided
    if not search_query:
        return jsonify({"error": "query is required"}), 400
    
    # Get the TMDB API key from the configuration
    api_key = current_app.config['TMDB_API_KEY']
    
    # Make the API request to TMDB to search for movies
    response = requests.get(f'https://api.themoviedb.org/3/search/multi?api_key={api_key}&query={search_query}&language=en-US&page=1')

    return jsonify(response.json())

@app.route('/similar', methods=['GET'])
def get_similar_movies():
    mediatype = request.args.get('type')
    movie_id = request.args.get('id')

    # Check if the movieId is provided
    if not movie_id:
        return jsonify({"error": "movieId is required"}), 400
    
    # Get the TMDB API key from the configuration
    api_key = current_app.config['TMDB_API_KEY']
    if (mediatype == 'movie'):
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key={api_key}&language=en-US&page=1')
    else:
        response = requests.get(f'https://api.themoviedb.org/3/tv/{movie_id}/similar?api_key={api_key}&language=en-US&page=1')
    print(response)
    return jsonify(response.json())


@app.route('/sililarNew', methods=['GET'])
def  get_similatFrom_ML():
    currentList =[]
    movie = request.args.get('movie')
    mediatype = request.args.get('type')
    movie_id = request.args.get('id')
    recommended_movies_ML = recommend(movie)
    # print(recommended_movies_ML)
    api_key = current_app.config['TMDB_API_KEY']
    if recommended_movies_ML == "404":
        print("generated by TMDB API")
        if (mediatype == 'movie'):
            response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key={api_key}&language=en-US&page=1')
        else:
            response = requests.get(f'https://api.themoviedb.org/3/tv/{movie_id}/similar?api_key={api_key}&language=en-US&page=1')
        # print(response)
        return jsonify(response.json())
    else:
        for movie in recommended_movies_ML:
            response = requests.get(
                f'https://api.themoviedb.org/3/search/multi',
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
        print("generated by ML model")
        response_data = {
        "page": 1,
        "results": currentList
        }
        return jsonify(response_data) # Return the list of movie details as JSON
    # return jsonify(recommended_movies)


@app.route('/getTorrentLinks', methods=['GET'])
def get_torrent_links():
    movie_title = request.args.get('movie_title')
    # Check if the movie title is provided
    if not movie_title:
        return jsonify({"error": "movie_title is required"}), 400
    
    # Search for the movie on YTS.mx
    response = requests.get(f'https://yts.mx/api/v2/list_movies.json?query_term={movie_title}')
    
    if response.status_code == 200:
        data = response.json()
        
        # Check if the 'movies' field is present and contains data
        if 'movies' in data['data'] and data['data']['movies']:
            movie = data['data']['movies'][0]  # Assuming you only care about the first movie in the list
            torrents = movie.get('torrents', [])  # Get the 'torrents' list or return an empty list if not present
            return jsonify(torrents)  # Return only the torrent details
        else:
            return jsonify({"error": "No movies found"}), 404
    else:
        return jsonify({"error": "Unable to fetch torrent links"}), response.status_code
    

@app.route('/getRecommendations',methods=['GET'])
def get_Recommendations():
    user_id = request.args.get('user_id')
    api_key = current_app.config['TMDB_API_KEY']
    # get the recomended movie list
    response_MovieIDs = requests.get(f'https://dspndkpg-3000.asse.devtunnels.ms/getRecommendations?user_id={user_id}')
    movie_ids = response_MovieIDs.json()

    print('response_MovieIDs',len (movie_ids['recommendaIDs']))

    if response_MovieIDs.status_code == 200 and len (movie_ids['recommendaIDs']) > 0:
        
        
        
        recommended_movie_ids = movie_ids['recommendaIDs'][0]['recommended_movie_ids']
# Print the extracted movie IDs
        print(recommended_movie_ids)

        recommended_movies = []
        # for movie_id in recommended_movie_ids:
        #     response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language=en-US')
        #     if response.status_code == 200:
        #         recommended_movies.append(response.json())


        # parallel processing ///////////////////////
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Map fetch_movie_details to movie_ids
            future_to_movie = {executor.submit(fetch_movie_details, movie_id, api_key): movie_id for movie_id in recommended_movie_ids}
            
            for future in concurrent.futures.as_completed(future_to_movie):
                movie_details = future.result()
                if movie_details:
                    recommended_movies.append(movie_details)
        return jsonify(recommended_movies)
    else:
        return jsonify({"error": "Unable to fetch recommendations"}), response_MovieIDs.status_code


@app.route('/getTrending',methods=['GET'])
def get_Trending():
    type = request.args.get('type')
    api_key = current_app.config['TMDB_API_KEY']
    response = requests.get(f'https://api.themoviedb.org/3/trending/{type}/day?api_key={api_key}')
    return jsonify(response.json())

app.run(port=5000, debug=True , host="0.0.0.0")