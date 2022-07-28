from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from Cinema_WS.BL_cinema.users_file_bl import *
from Cinema_WS.BL_cinema.permissions_bl import *
from Cinema_WS.BL_cinema.users_db_bl import *
from Cinema_WS.BL_cinema.WSsubscruption_bl import *
from Cinema_WS.BL_cinema.jwt_bl import *
from bl.members_bl import MembersBL
from bl.movies_bl import *
import json

app = Flask(__name__)
CORS(app)

usersBL = UsersBL()
permissionBL = PermissionBL()
users_db_bl = UsersLoginBL()
subscription = Ws_subscription_bl()
jwt_bl = JwtBL()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app.json_encoder = MyEncoder


# get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(usersBL.get_all_users())


# get user
@app.route('/users/<string:id>', methods=['GET'])
def get_user(id):
    return jsonify(usersBL.get_user(id))


# add user
@app.route('/users', methods=['POST'])
def add_user():
    return jsonify(usersBL.add_usr(request.json))


# update user
@app.route('/users/<string:id>', methods=['PUT'])
def update_user(id):
    return jsonify(usersBL.update_user(id, request.json))


# delete user
@app.route('/users/<string:id>', methods=['DELETE'])
def delete_user(id):
    print(("deleteusermain"))
    usersBL.delete_user(id)
    return jsonify('Deleted !')


# get all permissions
@app.route('/permissions', methods=['GET'])
def get_all_permissions():
    return jsonify(permissionBL.get_all_permissions())


# get permission
@app.route('/permissions/<string:id>', methods=['GET'])
def get_permission(id):
    return jsonify(permissionBL.get_permission(id))


# add permission
@app.route('/permissions', methods=['POST'])
def add_permission():
    return jsonify(permissionBL.add_permission(request.json))


# update permission
@app.route('/permissions/<string:id>', methods=['PUT'])
def update_permission(id):
    return jsonify(permissionBL.update_permission(id, request.json))


# delete permission
@app.route('/permissions/<string:id>', methods=['DELETE'])
def delete_permission(id):
    permissionBL.delete_permission(id)
    return "deleted!!"


# get all users
@app.route('/usersLogin', methods=['GET'])
def get_all_users_login():
    user= users_db_bl.get_all_users()
    return jsonify(user)


# get user
@app.route('/usersLogin/<string:id>', methods=['GET'])
def get_user_login(id):
    return jsonify(users_db_bl.get_user(id))


# add user
@app.route('/usersLogin', methods=['POST'])
def add_user_login():
    status = users_db_bl.add_user(request.json)
    return jsonify(status)


# update user
@app.route('/usersLogin/<string:id>', methods=['PUT'])
def update_user_login(id):
    return jsonify(users_db_bl.update_user(id, request.json))


# delete user
@app.route('/usersLogin/<string:id>', methods=['DELETE'])
def delete_user_login(id):
    users_db_bl.delete_user(id)
    return "deleted!!"


# get all information
@app.route('/<string:path>', methods=['GET'])
def get_all_information(path):
    user = subscription.get_all_information(path)
    return jsonify(user)


# get information
@app.route('/<string:path>/<string:id>', methods=['GET'])
def get_one_information(path, id):
    return jsonify(subscription.get_one_information(path, id))


# add information
@app.route('/<string:path>', methods=['POST'])
def add_information(path):
        print(request.json)
        status = requests.post("http://127.0.0.1:5000/"+path, json=request.json)
        return status.json()


# update information
@app.route('/<string:path>/<string:id>', methods=['PUT'])
def update_information(path, id):
        print("cinmamain")
        print(path, id)
        status = requests.put("http://127.0.0.1:5000/"+path+"/"+id, json=request.json)
        return status.json()


# delete information
@app.route('/<string:path>/<string:id>', methods=['DELETE'])
def delete_information(path, id):
    subscription.delete_information(path, id)
    return "deleted!!"


@app.route('/auth/login', methods=['POST'])
def login():
    user_name = request.json["UserName"]
    pwd = request.json["Password"]
    # I have a problem with jwt  encode so I send to the chack_user function
    # only the username and password to check if it exists
    # in the system and according to this give it the permissions
    # the function return the id of this user_login
    is_exist = jwt_bl.check_user(user_name, pwd)
    return is_exist


app.run(host='0.0.0.0', port=5000)
