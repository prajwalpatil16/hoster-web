from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import get_db_connection

user_bp = Blueprint("user", __name__, url_prefix="/api/user")

@user_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, name, email, role, created_at FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        return jsonify(user)
    finally:
        cursor.close()
        conn.close()

@user_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "UPDATE users SET name = %s WHERE id = %s",
            (data.get("name"), user_id)
        )
        conn.commit()
        return jsonify({"message": "Profile updated"})
    finally:
        cursor.close()
        conn.close()

@user_bp.route("/dashboard", methods=["GET"])
@jwt_required()
def get_dashboard_stats():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT COUNT(*) as count FROM services WHERE user_id = %s", (user_id,))
        service_count = cursor.fetchone()["count"]
        
        cursor.execute("SELECT SUM(amount) as total FROM invoices WHERE user_id = %s AND status = 'unpaid'", (user_id,))
        pending_billing = cursor.fetchone()["total"] or 0
        
        return jsonify({
            "active_services": service_count,
            "pending_billing": float(pending_billing),
            "alerts": [] # Mocked for now
        })
    finally:
        cursor.close()
        conn.close()
