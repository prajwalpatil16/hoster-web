from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from app.config import Config


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
    jwt = JWTManager(app)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user["id"] if isinstance(user, dict) else user

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return identity
 

    from app.routes.authy import auth_bp
    from app.routes.contact import contact_bp
    from app.routes.health import health_bp
    from app.routes.user import user_bp
    from app.routes.services import services_bp
    from app.routes.billing import billing_bp
    from app.routes.support import support_bp
    from app.routes.admin import admin_bp
    from app.routes.public import public_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(services_bp)
    app.register_blueprint(billing_bp)
    app.register_blueprint(support_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(public_bp)

    return app
