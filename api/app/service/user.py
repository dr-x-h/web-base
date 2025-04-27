import uuid

from api import db
from api.app.models.user import User


class UserService:
    @staticmethod
    def get_all_user():
        users = User.query.all()
        return users

    @staticmethod
    def get_user_by_username(username):
        user = User.query.filter_by(username=username).first()
        return user

    @staticmethod
    def add_user(username, password, role="user"):
        user = User.query.filter_by(username=username).first()
        if user:
            return user
        user = User(id=uuid.uuid4().hex, username=username, password=password, role=role)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def remove_user(user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()

    @staticmethod
    def update_user(user_id, username=None, password=None, last_login=None, role=None):
        user = User.query.get(user_id)
        if username:
            user.username = username
        if password:
            user.password = password
        if last_login:
            user.last_login = last_login
        if role:
            user.role = role
        db.session.commit()
