# Hoster Backend

Backend service for the Hoster company landing website.

This backend handles contact and career inquiries, provides a simple
admin API, and stores data securely in a MySQL database.

---

## Tech Stack
- Flask
- MySQL
- JWT Authentication
- Flask-CORS

---

## Features
- Health check API
- Contact & Careers inquiry API
- Admin login (JWT)
- View inquiries
- Mark inquiries as read
- Delete inquiries

---

## API Endpoints

### Public
- GET /api/health
- POST /api/contact

### Admin (JWT required)
- POST /api/auth/login
- GET /api/contact/admin
- PUT /api/contact/admin/:id/read
- DELETE /api/contact/admin/:id

---

## Run Locally

```bash
python run.py
