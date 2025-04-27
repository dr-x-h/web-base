from flask import Flask
from flask_login import LoginManager

from api.app.config import Config

app = None


def create_app(config_default=Config):
    global app
    if app is None:
        app = Flask(__name__)
        app.config.from_object(config_default)
        app.json.ensure_ascii = False

        from .extensions import db, db_migrate
        db.init_app(app)
        db_migrate.init_app(app, db)

        login = LoginManager()
        login.init_app(app)
        from .utils.login import login_handle
        login_handle(login)

        from .routes import api
        app.register_blueprint(api, url_prefix='/v1')

        from .errors.handler import error_handler
        error_handler(app)

    return app


__all__ = ['create_app']
