from api.app.models.user import User
from api.app.utils.response import error


def login_handle(login):
    @login.unauthorized_handler
    def unauthorized():
        return error(message="用户未登录"), 401

    @login.user_loader
    def load_user(user_id):
        return User.query.get(user_id)
