from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from app.config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    JWTManager(app)
 

    from app.routes.authy import auth_bp
    from app.routes.contact import contact_bp
    from app.routes.health import health_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(health_bp)

    return app
