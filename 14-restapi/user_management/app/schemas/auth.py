from email_validator import EmailNotValidError, validate_email

from app.models.user import USER_ROLES


def _is_strong_password(password: str) -> bool:
    if len(password) < 12:
        return False

    has_upper = any(ch.isupper() for ch in password)
    has_lower = any(ch.islower() for ch in password)
    has_digit = any(ch.isdigit() for ch in password)
    has_symbol = any(not ch.isalnum() for ch in password)
    return has_upper and has_lower and has_digit and has_symbol


def validate_register_payload(payload: dict) -> dict:
    errors = {}

    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))
    raw_role = payload.get("role")
    role = "customer" if raw_role in (None, "") else str(raw_role).strip().lower()

    if len(name) < 2:
        errors["name"] = "Name must be at least 2 characters"

    try:
        validate_email(email, check_deliverability=False)
    except EmailNotValidError:
        errors["email"] = "Invalid email format"

    if not _is_strong_password(password):
        errors["password"] = (
            "Password must be at least 12 chars and include upper, lower, number, and symbol"
        )

    if role not in USER_ROLES:
        errors["role"] = "Role must be one of: admin, staff, customer"

    return errors


def validate_login_payload(payload: dict) -> dict:
    errors = {}

    email = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))

    if not email:
        errors["email"] = "Email is required"
    if not password:
        errors["password"] = "Password is required"

    return errors
