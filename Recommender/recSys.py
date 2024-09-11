from flask import Flask, jsonify
from pymongo import MongoClient

# MongoDB connection string (replace with your own URI)
uri = "mongodb+srv://Mahesha:Tg%23078DB@cluster0.wgivi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Initialize the Flask app
app = Flask(__name__)

# Create a MongoClient instance
client = MongoClient(uri)

# Define the MongoDB database
mdb = client['MovieMania']


# Define a route for the home page
@app.route('/')
def home():
    return 'Hello, Flask!'

# Run the app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True, port=1000)