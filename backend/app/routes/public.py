from flask import Blueprint, request, jsonify
from app.db import get_db_connection
import json

public_bp = Blueprint("public", __name__, url_prefix="/api/public")

@public_bp.route("/plans", methods=["GET"])
def list_plans():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM plans WHERE is_active = TRUE")
        plans = cursor.fetchall()
        for p in plans:
            if isinstance(p['features'], str):
                p['features'] = json.loads(p['features'])
        return jsonify(plans)
    finally:
        cursor.close()
        conn.close()

@public_bp.route("/content/<section>", methods=["GET"])
def get_site_content(section):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT content FROM site_content WHERE section_name = %s", (section,))
        res = cursor.fetchone()
        if res:
            return jsonify(json.loads(res['content']))
        return jsonify({})
    finally:
        cursor.close()
        conn.close()

@public_bp.route("/platform-stats", methods=["GET"])
def get_platform_stats():
    return jsonify({
        "uptime": "99.99%",
        "users": "10k+",
        "servers": "500+"
    })
