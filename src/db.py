import datetime
import hashlib
import os

import bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, Column, Table, UniqueConstraint
from sqlalchemy.orm import relationship

db = SQLAlchemy()

friendship = Table(
    'friendships', db.Model.metadata,
    Column('user_id', Integer, ForeignKey('user.id'), index=True),
    Column('friend_id', Integer, ForeignKey('user.id')),
    UniqueConstraint('user_id', 'friend_id', name='unique_friendships'))


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, nullable=True, unique=False)
    device_id = db.Column(db.String, nullable=True, unique=False)
    device_type = db.Column(db.String, nullable=True, unique=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_digest = db.Column(db.String, nullable=False)
    session_token = db.Column(db.String, nullable=False, unique=True)
    session_expiration = db.Column(db.DateTime, nullable=False)
    update_token = db.Column(db.String, nullable=False, unique=True)
    friends = relationship('User',
                           secondary=friendship,
                           primaryjoin=id==friendship.c.user_id,
                           secondaryjoin=id==friendship.c.friend_id)

    def __init__(self, **kwargs):
        self.user_id = kwargs.get("user_id")
        self.device_id = kwargs.get("device_id")
        self.device_type = kwargs.get("device_type")
        self.email = kwargs.get("email")
        self.password_digest = bcrypt.hashpw(kwargs.get("password").encode("utf8"), bcrypt.gensalt(rounds=13))
        self.renew_session()

    def befriend(self, friend):
        if friend not in self.friends:
            self.friends.append(friend)
            friend.friends.append(self)

    def unfriend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)
            friend.friends.remove(self)

    def __repr__(self):
        return '<User(name=|%s|)>' % self.name

    # Used to randomly generate session/update tokens
    def _urlsafe_base_64(self):
        return hashlib.sha1(os.urandom(64)).hexdigest()

    # Generates new tokens, and resets expiration time
    def renew_session(self):
        self.session_token = self._urlsafe_base_64()
        self.session_expiration = datetime.datetime.now() + datetime.timedelta(days=1)
        self.update_token = self._urlsafe_base_64()

    def verify_password(self, password):
        return bcrypt.checkpw(password.encode("utf8"), self.password_digest)

    # Checks if session token is valid and hasn't expired
    def verify_session_token(self, session_token):
        return session_token == self.session_token and datetime.datetime.now() < self.session_expiration

    def verify_update_token(self, update_token):
        return update_token == self.update_token

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "device_id": self.device_id,
            "device_type": self.device_type,
            "email": self.email,
            "friends": [friend.email for friend in self.friends] if hasattr(self, 'friends') else []
        }

class Entry(db.Model):
    __tablename__ = "entry"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    latitude = db.Column(db.Integer, nullable=False)
    longitude = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=True)

    def __init__(self, **kwargs):
        self.user_id = kwargs.get("user_id")
        self.title = kwargs.get("title")
        self.description = kwargs.get("description", "")
        self.created_at = kwargs.get("created_at")
        self.latitude = kwargs.get("latitude")
        self.longitude = kwargs.get("longitude")
        self.address = kwargs.get("address")
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "created_at": str(self.created_at),
            "latitude": self.latitude,
            "longitude": self.longitude,
            "address": self.address,
        }
