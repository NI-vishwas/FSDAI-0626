from flask import Flask

from app.api import register_blueprints
from app.core.config import get_config
from app.core.logging import configure_logging
from app.extensions import cors, db, jwt, limiter, migrate, talisman


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(get_config())

    configure_logging(app)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)

    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
        supports_credentials=False,
    )

    talisman.init_app(
        app,
        force_https=app.config["FORCE_HTTPS"],
        content_security_policy=None,
    )

    register_blueprints(app)
    register_error_handlers(app)

    return app


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(404)
    def not_found(_error):
        return {"error": "Resource not found"}, 404

    @app.errorhandler(429)
    def ratelimit_handler(_error):
        return {"error": "Rate limit exceeded"}, 429

    @app.errorhandler(500)
    def internal_error(_error):
        return {"error": "Internal server error"}, 500
