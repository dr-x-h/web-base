from flask_login import UserMixin

from ..extensions import db


class User(UserMixin, db.Model):
    id = db.Column(db.String(255), primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    last_login = db.Column(db.DateTime)
    role = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        if self.last_login:
            last_login_time = self.last_login.strftime("%Y-%m-%d %H:%M:%S")
        else:
            last_login_time = ""
        return {'id': self.id, 'username': self.username, 'password': self.password, 'last_login': last_login_time,
                'role': self.role}
