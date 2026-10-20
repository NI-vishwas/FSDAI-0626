# Flask + MySQL Secure Backend API

Production-ready Flask API scaffold with scalable folder structure, MySQL integration, and core security best practices.

## Folder structure

```text
app2/
├── app/
│   ├── __init__.py              # App factory + extension wiring
│   ├── extensions.py            # db, jwt, cors, limiter, migrate, talisman
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── auth.py          # auth endpoints
│   │       └── health.py        # health endpoint
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py            # env-based secure config
│   │   └── logging.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── auth.py              # payload validation
│   └── services/
│       ├── __init__.py
│       └── auth_service.py      # DB/auth business logic
├── migrations/                 # created by `flask db init`
├── .env.example
├── .flaskenv
├── .gitignore
├── requirements.txt
├── run.py
└── wsgi.py
```

## Security best practices implemented

- Environment-based secrets (`SECRET_KEY`, `JWT_SECRET_KEY`) with strict validation.
- No hardcoded credentials.
- Password hashing using `scrypt` via Werkzeug.
- Input validation for email and password complexity.
- Rate limiting globally and on auth endpoints.
- CORS allow-list only (`CORS_ORIGINS`).
- Security headers via Flask-Talisman.
- Generic auth error response to reduce account enumeration.
- MySQL pool health checks (`pool_pre_ping`).

## Setup

1. Create virtual environment and install packages:
   - `pip install -r requirements.txt`
2. Copy env template:
   - `cp .env.example .env`
3. Update `.env` with real secrets and MySQL values.
   - For `flask run`, set `FLASK_RUN_HOST` and `FLASK_RUN_PORT`.
   - For `python run.py`, set `APP_HOST` and `APP_PORT`.
4. Create DB and run migrations:
   - If you see `ImportError: Can't find Python file migrations/env.py`, remove the incomplete folder first:
     - `rm -rf migrations`
   - `flask db init` (first time only)
   - `flask db migrate -m "initial schema"`
   - `flask db upgrade`
5. Run:
   - `flask run` (uses `FLASK_RUN_HOST` / `FLASK_RUN_PORT`)
   - or `python run.py` (uses `APP_HOST` / `APP_PORT`)

## API endpoints

- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Register payload

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPass#2026"
}
```

### Login payload

```json
{
  "email": "jane@example.com",
  "password": "StrongPass#2026"
}
```
