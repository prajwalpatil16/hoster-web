from app.db import get_db_connection
from werkzeug.security import generate_password_hash

def fix_admin():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    hashed_pw = generate_password_hash('admin123')
    
    try:
        cursor.execute(
            "UPDATE users SET password_hash = %s WHERE email = 'admin@hoster.com'",
            (hashed_pw,)
        )
        conn.commit()
        print("Admin password updated successfully.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    fix_admin()
