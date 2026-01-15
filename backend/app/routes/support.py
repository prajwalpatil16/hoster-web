from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import get_db_connection

support_bp = Blueprint("support", __name__, url_prefix="/api/support")

@support_bp.route("/ticket", methods=["POST"])
@jwt_required()
def create_ticket():
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "INSERT INTO support_tickets (user_id, subject, message) VALUES (%s, %s, %s)",
            (user_id, data.get("subject"), data.get("message"))
        )
        conn.commit()
        return jsonify({"message": "Ticket created successfully"}), 201
    finally:
        cursor.close()
        conn.close()

@support_bp.route("/tickets", methods=["GET"])
@jwt_required()
def get_tickets():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM support_tickets WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()
