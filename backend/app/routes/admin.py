from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import get_db_connection

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

def admin_required(fn):
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT role FROM users WHERE id = %s", (user_id,))
            user = cursor.fetchone()
            if not user or user.get("role") != 'admin':
                return jsonify({"error": "Admin access required"}), 403
        finally:
            cursor.close()
            conn.close()
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper

@admin_bp.route("/users", methods=["GET"])
@jwt_required()
@admin_required
def list_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, name, email, role, created_at FROM users")
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()

@admin_bp.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
@admin_required
def update_user_role(user_id):
    data = request.get_json()
    role = data.get("role")
    if role not in ['user', 'admin']:
        return jsonify({"error": "Invalid role"}), 400
        
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("UPDATE users SET role = %s WHERE id = %s", (role, user_id))
        conn.commit()
        return jsonify({"message": "User role updated"})
    finally:
        cursor.close()
        conn.close()

@admin_bp.route("/services", methods=["GET"])
@jwt_required()
@admin_required
def list_all_services():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT s.*, u.name as user_name, u.email as user_email, p.name as plan_name 
            FROM services s 
            JOIN users u ON s.user_id = u.id 
            JOIN plans p ON s.plan_id = p.id
        """)
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()

@admin_bp.route("/services/<int:service_id>", methods=["DELETE"])
@jwt_required()
@admin_required
def admin_delete_service(service_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("DELETE FROM services WHERE id = %s", (service_id,))
        conn.commit()
        return jsonify({"message": "Service force deleted"})
    finally:
        cursor.close()
        conn.close()

@admin_bp.route("/content/<section>", methods=["PUT"])
@jwt_required()
@admin_required
def update_site_content(section):
    data = request.get_json()
    import json
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "INSERT INTO site_content (section_name, content) VALUES (%s, %s) ON DUPLICATE KEY UPDATE content = %s",
            (section, json.dumps(data), json.dumps(data))
        )
        conn.commit()
        return jsonify({"message": f"Section {section} updated"})
    finally:
        cursor.close()
        conn.close()
