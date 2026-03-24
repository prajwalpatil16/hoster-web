# Features and Flows Documentation

This document outlines the core features implemented in the Hoster project and explains the technical flow "under the hood" based on the codebase.

## 1. Authentication & Security

### Feature: User Registration & Login
**User Flow:**
1.  User enters credentials on `/signup` or `/login`.
2.  On success, they are redirected to the Dashboard.
3.  A JWT token is stored in the browser.

**Code Implementation:**
-   **Backend (`routes/authy.py`)**:
    -   `POST /register`: Hashes password using `werkzeug.security.generate_password_hash` before storing in MySQL.
    -   `POST /login`: Verifies password with `check_password_hash`. Creates a JWT using `flask_jwt_extended.create_access_token`.
    -   **Identity**: The JWT subject (`sub`) is set to the user's `id` string.
-   **Frontend (`pages/Login.jsx`)**:
    -   On successful API response, the `access_token` and `user` object are saved to `localStorage`.
    -   `UserDashboardLayout.jsx` checks for this token; if missing, it redirects to `/login`.

---

## 2. User Dashboard

### Feature: Service Management
**User Flow:**
1.  User views active services (Shared, VPS, etc.).
2.  User can **Start** or **Stop** a service.
3.  User can **Delete** a service.
4.  Real-time metrics (CPU, RAM) are displayed.

**Code Implementation:**
-   **Listing (`routes/services.py`)**:
    -   `GET /api/user/services`: Queries the `services` table joined with `plans` to show details.
    -   Filters by `user_id` obtained from `get_jwt_identity()`.
-   **Control (`routes/services.py`)**:
    -   `PUT /<id>`: Updates the `status` column. Only allows 'running' or 'stopped'.
    -   **Security**: Enforces `WHERE user_id = %s` to ensure users can only modify their own services.
-   **Metrics (`routes/services.py`)**:
    -   `GET /<id>/metrics`: Currently returns **mock data** (random values) for immediate UI feedback.

### Feature: Layout & Navigation
**Code Implementation:**
-   **`layouts/UserDashboardLayout.jsx`**:
    -   Uses `react-router-dom`'s `<Outlet />` to render nested pages.
    -   Sidebar navigation active state is determined by matching `location.pathname`.
    -   Displays user avatar and role from `localStorage` cache.

---

## 3. Admin Control Panel

### Feature: Role-Based Access Control (RBAC)
**User Flow:**
1.  Only users with `role: "admin"` can access `/admin` routes.
2.  Admins can see all users and manage all services.

**Code Implementation:**
-   **Decorator (`routes/admin.py`)**:
    -   We created a custom `@admin_required` decorator.
    -   It fetches the current user from the DB and checks `if user.get("role") != 'admin'`.
    -   If not admin, returns `403 Forbidden`.
-   **Frontend Protection**:
    -   Admin pages are protected by checking `user.role === 'admin'` before rendering.

### Feature: Content Management System (CMS)
**Code Implementation:**
-   **Backend (`routes/admin.py` -> `update_site_content`)**:
    -   Accepts JSON payloads to update site sections (e.g., Landing Page text).
    -   Uses `ON DUPLICATE KEY UPDATE` to either insert or refresh content in the `site_content` table.

---

## 4. Frontend-Backend Communication

### Feature: Secure API Requests
**Code Implementation:**
-   **`utils/api.js`**:
    -   A central wrapper for `fetch`.
    -   **Interceptor**: Automatically checks `localStorage` for a `token`.
    -   If found, injects the header: `Authorization: Bearer <token>`.
    -   This ensures every request from the dashboard is authenticated without repetitive code.

---

## 5. Database Schema (Key Relationships)

-   **Users**: Stores secure credentials and roles (`user` vs `admin`).
-   **Plans**: predefined hosting packages (referenced by services).
-   **Services**: The core table linking `users` to `plans`.
    -   Foreign Key: `user_id` -> `users.id`
    -   Foreign Key: `plan_id` -> `plans.id`
    -   Constraint: Cascade delete ensures if a user is deleted, their services are cleaned up.
