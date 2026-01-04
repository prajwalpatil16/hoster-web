from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.db import get_db_connection

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")


@contact_bp.route("", methods=["POST"])
def submit_contact():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    company = data.get("company")
    source = data.get("source", "contact")

    if not name or not email or not message:
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO contact_messages (name, email, company, message, source)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (name, email, company, message, source)
    )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"success": True}), 201


@contact_bp.route("/admin", methods=["GET"])
@jwt_required()
def get_contacts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM contact_messages ORDER BY created_at DESC"
    )
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


@contact_bp.route("/admin/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_contact(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM contact_messages WHERE id = %s",
        (id,)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"success": True})


@contact_bp.route("/admin/<int:id>/read", methods=["PUT"])
@jwt_required()
def mark_read(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE contact_messages SET is_read = TRUE WHERE id = %s",
        (id,)
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"success": True})
