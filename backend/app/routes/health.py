from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__, url_prefix="/api")

@health_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "service": "hoster-backend",
        "version": "v1"
    })
