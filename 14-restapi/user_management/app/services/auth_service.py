from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db
from app.models.user import USER_ROLES, User


def create_user(payload: dict) -> User:
    existing = User.query.filter_by(email=payload["email"].lower().strip()).first()
    if existing:
        raise ValueError("Email already registered")

    raw_role = payload.get("role")
    role = "customer" if raw_role in (None, "") else str(raw_role).strip().lower()
    if role not in USER_ROLES:
        raise ValueError("Invalid role")

    user = User(
        name=payload["name"].strip(),
        email=payload["email"].lower().strip(),
        password_hash=generate_password_hash(payload["password"], method="scrypt"),
        role=role,
    )
    db.session.add(user)
    db.session.commit()
    return user


def authenticate_user(email: str, password: str):
    user = User.query.filter_by(email=email.lower().strip(), is_active=True).first()
    if not user:
        return None

    if not check_password_hash(user.password_hash, password):
        return None

    return user
