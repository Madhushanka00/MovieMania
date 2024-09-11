from flask import Flask, jsonify
from pymongo import MongoClient

# MongoDB connection string (replace with your own URI)
uri = "mongodb+srv://Mahesha:Tg%23078DB@cluster0.wgivi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Initialize the Flask app
app = Flask(__name__)



# Create a MongoClient instance
client = MongoClient(uri)

# Create a MongoClient instance
try:
    client = MongoClient(uri)
    # Verify connection
    client.admin.command('ping')
    print("MongoDB connected successfully!")
except ConnectionError as e:
    print(f"Could not connect to MongoDB: {e}")

# Define the MongoDB database
mdb = client['MovieMania']


@app.route('/')
def check_connection():
    try:
        # Example operation: list collections in the 'MovieMania' database
        collections = mdb.list_collection_names()
        return f"Connected to MongoDB! Collections in MovieMania DB: {collections}"
    except Exception as e:
        return f"An error occurred: {e}"

# Run the app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True, port=1000)