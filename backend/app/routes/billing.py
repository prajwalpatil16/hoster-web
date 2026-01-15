from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.db import get_db_connection

billing_bp = Blueprint("billing", __name__, url_prefix="/api/billing")

@billing_bp.route("/summary", methods=["GET"])
@jwt_required()
def get_billing_summary():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM invoices WHERE user_id = %s ORDER BY created_at DESC LIMIT 5", (user_id,))
        recent_invoices = cursor.fetchall()
        
        cursor.execute("""
            SELECT p.name, p.price_monthly 
            FROM services s 
            JOIN plans p ON s.plan_id = p.id 
            WHERE s.user_id = %s
        """, (user_id,))
        active_subscriptions = cursor.fetchall()
        
        return jsonify({
            "recent_invoices": recent_invoices,
            "active_subscriptions": active_subscriptions
        })
    finally:
        cursor.close()
        conn.close()

@billing_bp.route("/invoices", methods=["GET"])
@jwt_required()
def get_invoices():
    identity = get_jwt_identity()
    user_id = identity["id"]
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM invoices WHERE user_id = %s ORDER BY created_at DESC", (user_id,))
        return jsonify(cursor.fetchall())
    finally:
        cursor.close()
        conn.close()

@billing_bp.route("/add-funds", methods=["POST"])
@jwt_required()
def add_funds():
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    amount = data.get("amount")
    
    if not amount:
        return jsonify({"error": "Amount is required"}), 400
        
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "INSERT INTO invoices (user_id, amount, status) VALUES (%s, %s, %s)",
            (user_id, amount, 'paid')
        )
        conn.commit()
        return jsonify({"message": f"Successfully added ${amount} to your account."}), 200
    finally:
        cursor.close()
        conn.close()
@billing_bp.route("/upgrade", methods=["POST"])
@jwt_required()
def upgrade_plan():
    identity = get_jwt_identity()
    user_id = identity["id"]
    data = request.get_json()
    plan_id = data.get("plan_id")
    
    if not plan_id:
        return jsonify({"error": "Plan ID is required"}), 400
        
    # In a real SaaS, this would create a support ticket or update the subscription
    return jsonify({"message": "Upgrade request received. Our team will contact you shortly."}), 200
