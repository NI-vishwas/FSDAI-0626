from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db
from app.models.user import User


def create_user(payload: dict) -> User:
    existing = User.query.filter_by(email=payload["email"].lower().strip()).first()
    if existing:
        raise ValueError("Email already registered")

    user = User(
        name=payload["name"].strip(),
        email=payload["email"].lower().strip(),
        password_hash=generate_password_hash(payload["password"], method="scrypt"),
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
