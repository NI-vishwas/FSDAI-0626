import os

from app import create_app

app = create_app()

if __name__ == "__main__":
    run_kwargs = {}
    app_host = os.getenv("APP_HOST")
    app_port = os.getenv("APP_PORT")

    if app_host:
        run_kwargs["host"] = app_host
    if app_port:
        run_kwargs["port"] = int(app_port)

    app.run(**run_kwargs)
