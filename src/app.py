import json
import os
import requests
from radar import RadarClient
from db import db, Entry, User
from flask import Flask
from flask import request
import datetime
import users_dao
from dotenv import load_dotenv
from geopy import distance
load_dotenv()

db_filename = "geojournal.db"
app = Flask(__name__)

# https://radar-python.readthedocs.io/en/latest/
RADAR_SECRET_KEY = os.getenv("RADAR_SECRET_KEY")
radar = RadarClient(RADAR_SECRET_KEY)
RADIUS_KM = 1

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

db.init_app(app)
with app.app_context():
    db.create_all()

def success_response(data, code=200):
    return json.dumps({"success": True, "data": data}), code
def failure_response(message, code=404):
    return json.dumps({"success": False, "error": message}), code

def get_address(latitude, longitude):
    addresses = radar.geocode.reverse(coordinates=(latitude,longitude))
    if addresses is not None:
        return addresses[0].formattedAddress
    return None

def extract_token(request):
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        return failure_response("Missing authorization header")
    # Header looks like "Authorization: Bearer <session token>"
    bearer_token = auth_header.replace("Bearer ", "").strip()
    if bearer_token is None or not bearer_token:
        return failure_response("Invalid authorization header")
    return True, bearer_token


@app.route("/")
def hello_world():
    return success_response("Hello World")


@app.route("/register/", methods=["POST"])
def register_account():
    body = json.loads(request.data)
    email = body.get("email")
    password = body.get("password")
    user_id = body.get("user_id")
    device_id = body.get("device_id")
    device_type = body.get("device_type")
    if email is None or password is None:
        return failure_response("Invalid email or password")
    if user_id is None or device_id is None or device_type is None:
        return json.dumps({"error": "Need to supply user_id, device_id, and device_type."})
    created, user = users_dao.create_user(email, password, user_id, device_id, device_type)
    if not created:
        return failure_response("User already exists.")
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

@app.route("/entry/", methods=["POST"])
def create_entry():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    body = json.loads(request.data)
    latitude = body.get("latitude")
    longitude = body.get("longitude")
    title = body.get("title")
    description = body.get("description")
    address = get_address(latitude, longitude)
    date = datetime.datetime.now().replace(microsecond=0)
    entry = Entry(user_id=user.id, title=title, description=description, created_at=date, latitude=latitude, longitude=longitude, address=address)
    db.session.add(entry)
    db.session.commit()
    return success_response(entry.serialize())

@app.route("/entry/<int:entry_id>/", methods=["DELETE"])
def delete_entry(entry_id):
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    entry = Entry.query.filter_by(id=entry_id, user_id=user.id).first()
    if entry is None:
        return failure_response('Entry does not exist.')
    db.session.delete(entry)
    db.session.commit()
    return success_response(entry.serialize())

@app.route("/entries/", methods=["GET"])
def view_entries():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    entries = Entry.query.filter_by(user_id=user.id)
    return success_response([e.serialize() for e in entries])
    # body = json.loads(request.data)
    # longitude, latitude = body.get("longitude"), body.get("latitude")
    # if longitude is None or latitude is None:
    # return failure_response("not yet implemented!")


@app.route("/friend-entries/", methods=["POST"])
def view_friend_entries():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})

    body = json.loads(request.data)
    latitude = body.get("latitude")
    longitude = body.get("longitude")

    entries = []
    for friend in user.friends:
        entries.extend(Entry.query.filter_by(user_id=friend.id).all())
    actual_entries = []
    for entry in entries:
        if within_radius(latitude, longitude, entry.latitude, entry.longitude):
            actual_entries.append(entry)
    return success_response([e.serialize() for e in actual_entries])


def within_radius(latitude_1, longitude_1, latitude_2, longitude_2):
    global RADIUS_KM
    return (distance.distance((latitude_1, longitude_1), (latitude_2, longitude_2)).km < RADIUS_KM)


@app.route("/friends/", methods=["POST"])
def add_friends():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    body = json.loads(request.data)
    emails = body.get("friends")
    for email in emails:
        query = User.query.filter_by(email=email)
        if query is not None:
            friend = query.first()
            user.befriend(friend)
    db.session.commit()
    return success_response(user.serialize())

@app.route("/me/", methods=["GET"])
def me():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    return success_response(user.serialize())

@app.route("/friend-search/<string:query>/", methods=["GET"])
def search_friends(query):
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    users = User.query.filter(User.email.contains(query))
    return success_response([u.simple_serialize() for u in users])

@app.route("/friends/<int:friend_id>/", methods=["DELETE"])
def delete_friends(friend_id):
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})

    for friend in user.friends: # TODO jank?
        if friend_id == friend.id:
            user.friends.remove(friend)
            friend.friends.remove(user)
            break
    db.session.commit()
    return success_response(friend.serialize())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

