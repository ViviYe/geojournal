import json
import os
from radar import RadarClient
from db import db, Entry, Geofence
from flask import Flask
from flask import request
import datetime
import users_dao
from dotenv import load_dotenv
load_dotenv()

db_filename = "geojournal.db"
app = Flask(__name__)

# https://radar-python.readthedocs.io/en/latest/
RADAR_SECRET_KEY = os.getenv("RADAR_SECRET_KEY")
radar = RadarClient(RADAR_SECRET_KEY)


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
    longitude = body.get("longitude")
    latitude = body.get("latitude")
    title = body.get("title")
    description = body.get("description")
    geofence = Geofence()
    db.session.add(geofence)
    db.session.commit()
    geofence_data = {
        "description": str(user.id),
        "type": "circle",
        "coordinates": [longitude, latitude],
        "radius": 100,
        # "tag": "store",
        "externalId": str(geofence.id),
    }
    radar_geofence = radar.geofences.create(data=geofence_data)
    print("hERE'S THE GEOFENCE", radar_geofence)
    entry = Entry(user_id=user.id, title=title, description=description, created_at=datetime.datetime.now(), longitude=longitude, latitude=latitude, geo_id=geofence.id)
    db.session.add(entry)
    db.session.commit()
    return success_response(entry.serialize())

@app.route("/entries/", methods=["POST"])
def view_entries():
    success, session_token = extract_token(request)
    if not success:
        return session_token
    user = users_dao.get_user_by_session_token(session_token)
    if not user or not user.verify_session_token(session_token):
        return json.dumps({"error": "Invalid session token."})
    entries = Entry.query.filter_by(user_id=user.id)
    body = json.loads(request.data)
    longitude, latitude = body.get("longitude"), body.get("latitude")
    if longitude is None or latitude is None:
        return success_response([e.serialize() for e in entries])
    nearby_geofences = radar.search.geofences(near=[longitude, latitude])
    external_ids = [int(g.externalId) for g in nearby_geofences]
    for ext_id in external_ids:
        e = Entry.query.filter(geo_id=ext_id).all()
        entries.extend(e)
    return success_response([e.serialize() for e in entries])
    

# @app.route("/add-friends/", methods=["POST"])
# def add_friends():
    
#     success, session_token = extract_token(request)

#     if not success:
#         return session_token

#     user = users_dao.get_user_by_session_token(session_token)
#     if not user or not user.verify_session_token(session_token):
#         return json.dumps({"error": "Invalid session token."})

#     body = json.loads(request.data)
#     email_list = body.get("friends")
#     user = users_dao.get_user_by_session_token(session_token)

#     print(user.friends)

#     # for email in email_list:
#     #     friend_email = User.query.filter_by(email=email).first()
#         # User.friends.append

#     return json.dumps({"message": "It works?"})

#     # if not user or not user.verify_session_token(session_token):
#     #     return json.dumps({"error": "Invalid session token."})


#     # return json.dumps({"message": "You have successfully implemented sessions."})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

