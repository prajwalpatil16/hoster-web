from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import get_db_connection

services_bp = Blueprint("services", __name__, url_prefix="/api/user/services")

@services_bp.route("", methods=["GET"])
@jwt_required()
def list_services():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT s.*, p.name as plan_name 
            FROM services s 
            JOIN plans p ON s.plan_id = p.id 
            WHERE s.user_id = %s
        """, (user_id,))
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()

@services_bp.route("", methods=["POST"])
@jwt_required()
def create_service():
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "INSERT INTO services (user_id, plan_id, name, status) VALUES (%s, %s, %s, 'running')",
            (user_id, data.get("plan_id"), data.get("name"))
        )
        conn.commit()
        return jsonify({"message": "Service created"}), 201
    finally:
        cursor.close()
        conn.close()

@services_bp.route("/<int:service_id>", methods=["PUT"])
@jwt_required()
def update_service_status(service_id):
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    status = data.get("status")
    
    if status not in ['running', 'stopped']:
        return jsonify({"error": "Invalid status"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "UPDATE services SET status = %s WHERE id = %s AND user_id = %s",
            (status, service_id, user_id)
        )
        conn.commit()
        return jsonify({"message": f"Service status updated to {status}"})
    finally:
        cursor.close()
        conn.close()

@services_bp.route("/<int:service_id>", methods=["DELETE"])
@jwt_required()
def delete_service(service_id):
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("DELETE FROM services WHERE id = %s AND user_id = %s", (service_id, user_id))
        conn.commit()
        return jsonify({"message": "Service deleted"})
    finally:
        cursor.close()
        conn.close()

@services_bp.route("/<int:service_id>/metrics", methods=["GET"])
@jwt_required()
def get_metrics(service_id):
    import random
    # Mocking real-time metrics
    return jsonify({
        "cpu": round(random.uniform(5, 45), 2),
        "ram": round(random.uniform(20, 80), 2),
        "storage": 15.4,
        "uptime": "12d 4h 22m"
    })
