from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

ADMIN_EMAIL = "admin@hoster.com"
ADMIN_PASSWORD = "admin123"

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    if data.get("email") != ADMIN_EMAIL or data.get("password") != ADMIN_PASSWORD:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=ADMIN_EMAIL)
    return jsonify({"access_token": token})
