from datetime import datetime

from flask import request
from flask_login import login_required, login_user, logout_user, current_user

from . import api
from ..errors import ValidationError
from ..service.user import UserService
from ..utils.hash import to_hash, verify_hash
from ..utils.response import success, error


@api.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        raise ValidationError()
    data = request.get_json()
    if "username" not in data or "password" not in data:
        raise ValidationError()
    user = UserService.get_user_by_username(data["username"])
    if user is None:
        return error(message="用户不不存在或密码错误")
    if verify_hash(data["password"], user.password):
        user = UserService.update_user(user.id, last_login=datetime.now())
        login_user(user)
        user = user.to_dict()
        return success(data=user)
    return error(message="用户不不存在或密码错误")


@api.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return success()


@api.route("/user", methods=["POST"])
def register():
    if not request.is_json:
        raise ValidationError()
    data = request.get_json()
    if "username" not in data or "password" not in data:
        raise ValidationError()
    user = UserService.get_user_by_username(username=data["username"])
    if user:
        return error(message="用户名已存在")
    UserService.add_user(data["username"], to_hash(data["password"]))
    return success()


@api.route("/user", methods=["GET"])
@login_required
def get_user():
    if user_id := request.args.get("id"):
        if current_user.role == "admin" or user_id == current_user.id:
            user = UserService.get_user_by_id(user_id)
        else:
            return error(message="权限不足"), 403
    else:
        user = UserService.get_user_by_id(current_user.id)
    user_dict = user.to_dict()
    return success(data=user_dict)


@api.route("/user", methods=["DELETE"])
@login_required
def cancel():
    user_id = request.args.get("id")
    if not user_id or user_id == current_user.id:
        UserService.remove_user(current_user.id)
    user = UserService.get_user_by_id(user_id)
    if user:
        UserService.remove_user(user_id)
        return success()
    return error(message="用户不存在")


@api.route("/users", methods=["GET"])
@login_required
def get_users():
    if current_user.role == "admin":
        users = UserService.get_all_user()
        users_dict = [user.to_dict() for user in users]
        return success(data=users_dict)
    return error(message="权限不足"), 403
