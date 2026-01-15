from app.db import get_db_connection
from werkzeug.security import generate_password_hash
import random
from datetime import datetime, timedelta

def seed_data():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    password_hash = generate_password_hash("password123")
    
    # 1. Seed Users
    users = [
        ("Alice Johnson", "alice@example.com", password_hash, "user"),
        ("Bob Smith", "bob@example.com", password_hash, "user"),
        ("Charlie Brown", "charlie@example.com", password_hash, "user"),
        ("Diana Prince", "diana@example.com", password_hash, "user"),
        ("Ethan Hunt", "ethan@example.com", password_hash, "user")
    ]
    
    user_ids = []
    for name, email, pw, role in users:
        try:
            cursor.execute(
                "INSERT INTO users (name, email, password_hash, role, is_verified) VALUES (%s, %s, %s, %s, TRUE)",
                (name, email, pw, role)
            )
            user_ids.append(cursor.lastrowid)
        except Exception as e:
            print(f"Error seeding user {email}: {e}")
            cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
            row = cursor.fetchone()
            if row: user_ids.append(row['id'])

    # 2. Get Plans
    cursor.execute("SELECT id FROM plans")
    plan_ids = [row['id'] for row in cursor.fetchall()]

    # 3. Seed Services
    service_names = ["Production Cluster", "Staging Server", "Analytics Engine", "Database Node", "API Gateway"]
    statuses = ['running', 'stopped', 'pending']
    
    for uid in user_ids:
        # Each user gets 1-3 services
        for _ in range(random.randint(1, 3)):
            plan_id = random.choice(plan_ids)
            name = random.choice(service_names) + " " + str(random.randint(1, 99))
            status = random.choice(statuses)
            cpu = round(random.uniform(5.0, 85.0), 1)
            ram = round(random.uniform(10.0, 90.0), 1)
            storage = round(random.uniform(2.0, 100.0), 1)
            ip = f"192.168.{random.randint(1, 254)}.{random.randint(1, 254)}"
            
            cursor.execute(
                "INSERT INTO services (user_id, plan_id, name, status, cpu_usage, ram_usage, storage_usage, ip_address) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                (uid, plan_id, name, status, cpu, ram, storage, ip)
            )

    # 4. Seed Invoices
    for uid in user_ids:
        for i in range(5):
            amount = round(random.uniform(10.0, 200.0), 2)
            status = random.choice(['paid', 'paid', 'paid', 'unpaid'])
            date = datetime.now() - timedelta(days=i*30)
            cursor.execute(
                "INSERT INTO invoices (user_id, amount, status, created_at) VALUES (%s, %s, %s, %s)",
                (uid, amount, status, date)
            )

    # 5. Seed Support Tickets
    subjects = ["Login Issue", "Billing Question", "Latency Problems", "Upgrading Plan", "Custom Migration"]
    for uid in user_ids:
        for _ in range(random.randint(1, 2)):
            subject = random.choice(subjects)
            message = f"Hello, I am having some issues with {subject.lower()}. Please help."
            status = random.choice(['open', 'in-progress', 'closed'])
            priority = random.choice(['low', 'medium', 'high'])
            cursor.execute(
                "INSERT INTO support_tickets (user_id, subject, message, status, priority) VALUES (%s, %s, %s, %s, %s)",
                (uid, subject, message, status, priority)
            )

    # 6. Seed Contact Messages
    contacts = [
        ("John Doe", "john@comp.com", "Acme Corp", "Interested in Enterprise plan.", "contact"),
        ("Jane Smith", "jane@hiring.com", None, "Applying for Frontend Role.", "careers"),
        ("Sam Wilson", "sam@startup.io", "Cloudly", "Need a custom quote.", "contact"),
        ("Sara Lee", "sara@jobs.com", None, "Fullstack developer application.", "careers")
    ]
    for n, e, c, m, s in contacts:
        cursor.execute(
            "INSERT INTO contact_messages (name, email, company, message, source) VALUES (%s, %s, %s, %s, %s)",
            (n, e, c, m, s)
        )

    conn.commit()
    cursor.close()
    conn.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()
