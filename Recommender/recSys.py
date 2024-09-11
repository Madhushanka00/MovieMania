from flask import Flask

# Initialize the Flask app
app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def home():
    return 'Hello, Flask!'

# Run the app if the script is executed directly
if __name__ == '__main__':
    app.run(debug=True, port=1000)