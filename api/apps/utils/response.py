from flask import jsonify


def success(message=None, data=None):
    if message is None:
        message = "success"
    return jsonify({"code": 2000, "message": message, "data": data})


def error(code=None, message=None, data=None):
    if code is None:
        code = 5000
    if message is None:
        message = "error"
    return jsonify({"code": code, "message": message, "data": data})
