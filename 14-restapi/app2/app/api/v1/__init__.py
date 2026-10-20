from flask import Blueprint

from app.api.v1.auth import auth_bp
from app.api.v1.health import health_bp

v1_bp = Blueprint("v1", __name__)
v1_bp.register_blueprint(health_bp)
v1_bp.register_blueprint(auth_bp)
