from flask import Flask
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os
from flask_cors import CORS

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    
    # Load environment variables from .env
    load_dotenv()
    app.config['TMDB_API_KEY'] = os.getenv('TMDB_API_KEY')

    # Enable CORS
    CORS(app)

    # Register blueprints (routes)
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # Initialize SocketIO
    socketio.init_app(app, cors_allowed_origins="*")
    
    return app