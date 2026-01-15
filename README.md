# Hoster — Full-Stack SaaS Platform

Hoster is a production-grade SaaS application for managing digital products and hosting services. It features a modern, responsive public website, a secure multi-role authentication system, a comprehensive user dashboard, and an advanced admin control panel.

---

## 🚀 Live Demo
👉 [prajwal-hoster.netlify.app](https://prajwal-hoster.netlify.app/)

---

## ✨ Key Features

### 1. Public Landing Site (API-Driven)
- **Dynamic Content:** Hero sections, features, and platform stats are powered by backend APIs.
- **Service Catalog:** Detailed overview of hosting types (Shared, VPS, Cloud).
- **Interactive FAQ:** Dynamic support and inquiry sections.

### 2. Secure Authentication
- **JWT-Based Security:** Robust industry-standard session management.
- **Multi-Role Support:** Distinct flows for **Users** and **Admins**.
- **Secure Onboarding:** Full Sign-up, Login, and Password management flows.

### 3. User Dashboard (The Core Product)
- **Resource Monitoring:** Real-time metrics for CPU, RAM, and Storage usage.
- **Service Management:** Deploy, start, stop, and terminate hosting instances.
- **Billing & Subscriptions:** Full billing history, invoice downloads, and plan management.
- **Support System:** Raise and track support tickets directly from the dashboard.

### 4. Admin Control Panel
- **Global User Management:** View and manage all registered accounts.
- **Global Service Control:** Monitor and terminate any active service across the platform.
- **Content Management (CMS):** Update landing page content dynamically without code changes.
- **Inquiry Management:** Centralized hub for contact and career messages.

---

## 🛠️ Technical Stack

**Frontend:**
- **React (Vite):** blazing-fast UI development.
- **Tailwind CSS:** Professional, responsive design system.
- **Lucide React:** Premium iconography.
- **React Router 7:** Advanced client-side routing.

**Backend:**
- **Flask (Python):** Scalable RESTful API architecture.
- **Flask-JWT-Extended:** Secure token-based authentication.
- **MySQL:** Relational data storage for users, services, and billing.
- **Werkzeug:** Industry-standard password hashing.

---

## 🔑 Default Admin Credentials
For testing purposes, you can use the following administrator account:
- **Email:** `admin@hoster.com`
- **Password:** `admin123`

---

## ⚙️ Development Setup

### Backend
1. `cd backend`
2. Create virtual environment: `python3 -m venv venv`
3. Activate venv: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Configure `.env` with your DB credentials.
6. Initialize Database: `mysql -u root -p < database_saas.sql`
7. Run server: `PYTHONPATH=. python3 app/main.py` (Runs on port 5001)

### Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev` (Runs on port 5173/5174)

---

## 📈 Platform Status
- **Version:** 2.0.0 (Full SaaS Release)
- **Status:** Production Ready

---

## 📬 Contact
Created by **Prajwal Patil**  
📧 [prajwalgpatil20022@gmail.com](mailto:prajwalgpatil20022@gmail.com)
