# Hoster Project Documentation

## 1. Project Overview
**Hoster** is a full-stack SaaS platform designed for managing digital products and hosting services. It provides a cohesive ecosystem for users to provision resources (Shared, VPS, Cloud), manage billing, and interact with support, while Administrators have a dedicated control panel for platform management.

## 2. Architecture
The application follows a standard **Client-Server** architecture containing:
- **Frontend (Client):** Single Page Application (SPA) built with React and Vite.
- **Backend (Server):** RESTful API built with Flask (Python).
- **Database:** MySQL for relational data storage (User, Billing, Services).

### Architecture Diagram
```mermaid
graph TD
    User[User] -->|Browser| Frontend[Frontend (React/Vite)]
    Frontend -->|HTTP Requests| Backend[Backend (Flask API)]
    Backend -->|Read/Write| DB[(MySQL Database)]
    Backend -->|Auth| JWT[JWT Authentication]
```

## 3. Directory Structure

### Root Directory
- **backend/**: Contains all server-side logic, API definitions, and database configurations.
- **frontend/**: Contains the client-side React application.
- **README.md**: General project info and quick start guide.

### Backend (`/backend`)
Key directories and files:
- **app/**: Main application package.
  - **__init__.py**: Application factory (`create_app`), CORS setup, and blueprint registration.
  - **config.py**: Configuration class (DB URIs, Secret Keys).
  - **main.py**: Entry point for running the Flask server.
  - **routes/**: API route definitions (Blueprints).
    - `auth.py`: Authentication (Login, Signup, JWT).
    - `admin.py`: Admin dashboard endpoints.
    - `billing.py`: Invoice and payment management.
    - `services.py`: Hosting service management.
    - `user.py`: User profile management.
    - `public.py`: Public-facing data (Landing page stats).
- **requirements.txt**: Python dependencies.
- **seed_data.py**: Script to populate the database with initial testing data.

### Frontend (`/frontend`)
Key directories and files:
- **src/**: Source code.
  - **main.jsx**: Application entry point.
  - **App.jsx**: Main component and Routing setup.
  - **pages/**: React components for different pages (Dashboard, Admin, Landing).
  - **components/**: Reusable UI components.
- **vite.config.js**: Vite configuration.
- **package.json**: JS dependencies and scripts.

## 4. Backend Details

### Tech Stack
- **Framework:** Flask
- **Authentication:** `flask-jwt-extended` (Bearer Token)
- **Database Driver:** `mysql-connector-python`
- **CORS:** `flask-cors` allowed for `localhost:5173`.

### Key APIs (Blueprints)
1.  **Auth (`/api/auth`)**: Handles user registration and login. Returns JWT tokens.
2.  **Admin (`/api/admin`)**: Protected routes for admins to manage users and system settings.
3.  **User (`/api/user`)**: Profile management.
4.  **Services (`/api/services`)**: CRUD operations for hosting instances.
5.  **Billing (`/api/billing`)**: Invoice generation and history.
6.  **Public (`/api/public`)**: Publicly accessible data for the landing page.

### Database Setup
The database schema is defined in `.sql` files in the backend root (e.g., `database_saas.sql`).
- **Initialization:** Import the SQL file via MySQL CLI.
- **Seeding:** Run `python seed_data.py` to add sample users and services.

## 5. Frontend Details

### Tech Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React

### Development
The frontend interacts with the backend via REST calls, typically to `http://localhost:5001/api`.
- **Environment**: Ensure the API URL is correctly set (proxy or env var) to avoid CORS issues if ports differ.

## 6. Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server

### Running Locally

**1. Backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Ensure MySQL is running and database is imported
python app/main.py
```
*Server runs on `http://localhost:5001`*

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```
*App runs on `http://localhost:5173`*

## 7. Configuration
- **.env**: The backend relies on a `.env` file for database credentials (`DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_NAME`) and `SECRET_KEY`.
