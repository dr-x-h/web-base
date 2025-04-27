from flask import current_app

from api.app.errors import ValidationError
from api.app.utils.response import error


def error_handler(app):
    @app.errorhandler(ValidationError)
    def handle_ValidationError(e):
        current_app.logger.warning(e)
        return error(message=e.message), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        current_app.logger.warning(e)
        return error(message="error"), 500
