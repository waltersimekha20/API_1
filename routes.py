from main import app
from models import Users
from schemas import UsersSchema
from flask import make_response, jsonify




@app.route('/users', methods = ['GET'])
def get_users():
    user_list = Users.query.all()
    users = UsersSchema(many=True).dump(user_list)
    return make_response(jsonify(users), 200)

