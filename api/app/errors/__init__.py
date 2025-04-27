class ValidationError(Exception):
    def __init__(self, code: int = 5000, message: str = "参数错误", status_code: int = 500):
        self.code = code
        self.message = message
        self.status_code = status_code
