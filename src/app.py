import json

from db import db
from flask import Flask
from flask import request
import users_dao

db_filename = "auth.db"
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db.init_app(app)
with app.app_context():
    db.create_all()


def extract_token(request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return False, json.dumps({"error": "Missing authorization header."})

    # Header looks like "Authorization: Bearer <session token>"
    bearer_token = auth_header.replace("Bearer ", "").strip()
    if bearer_token is None or not bearer_token:
        return False, json.dumps({"error": "Invalid authorization header."})

    return True, bearer_token


@app.route("/")
def hello_world():
    return json.dumps({"message": "Hello, World!"})


@app.route("/register/", methods=["POST"])
def register_account():
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return json.dumps({"error": "Invalid email or password"})

    created, user = users_dao.create_user(email, password)

    if not created:
        return json.dumps({"error": "User already exists."})

    return json.dumps(
        {
            "session_token": user.session_token,
            "session_expiration": str(user.session_expiration),
            "update_token": user.update_token,
        }
    )


@app.route("/login/", methods=["POST"])
def login():
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return json.dumps({"error": "Invalid email or password"})

    success, user = users_dao.verify_credentials(email, password)

    if not success:
        return json.dumps({"error": "Incorrect email or password."})

    return json.dumps(
        {
            "session_token": user.session_token,
            "session_expiration": str(user.session_expiration),
            "update_token": user.update_token,
        }
    )


@app.route("/session/", methods=["POST"])
def update_session():
    success, update_token = extract_token(request)

    if not success:
        return update_token

    try:
        user = users_dao.renew_session(update_token)
    except Exception as e:
        return json.dumps({"error": f"Invalid update token: {str(e)}"})

    return json.dumps(
        {
            "session_token": user.session_token,
            "session_expiration": str(user.session_expiration),
            "update_token": user.update_token,
        }
    )


@app.route("/secret/", methods=["GET"])
def secret_message():
    success, session_token = extract_token(request)

    if not success:
        return session_token

    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})

    return json.dumps({"message": "You have successfully implemented sessions."})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

