from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from app.extensions import limiter
from app.schemas.auth import validate_login_payload, validate_register_payload
from app.services.auth_service import authenticate_user, create_user

auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/auth/register")
@limiter.limit("5/minute")
def register():
    payload = request.get_json(silent=True) or {}
    errors = validate_register_payload(payload)
    if errors:
        return {"errors": errors}, 400

    try:
        user = create_user(payload)
        return {
            "message": "User created",
            "data": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role,
            },
        }, 201
    except ValueError as exc:
        return {"error": str(exc)}, 400


@auth_bp.post("/auth/login")
@limiter.limit("10/minute")
def login():
    payload = request.get_json(silent=True) or {}
    errors = validate_login_payload(payload)
    if errors:
        return {"errors": errors}, 400

    user = authenticate_user(payload["email"], payload["password"])
    if not user:
        return {"error": "Invalid credentials"}, 401

    token = create_access_token(identity=str(user.id))
    return {
        "message": "Login successful",
        "data": {
            "access_token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role,
            },
        },
    }, 200
