from flask import Flask, jsonify, request
from flask_cors import CORS
from bson import ObjectId
from movies_bl import *
from members_bl import *
from subscriptions_bl import *
import json

app = Flask(__name__)
CORS(app)

moviesBL = MoviesBL()
membersBL = MembersBL()
subscriptionBL = SubscriptionsBL()


class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super(MyEncoder, self).default(obj)


app.json_encoder = MyEncoder


# get all movies
@app.route('/movies', methods=['GET'])
def get_all_movies():
    return jsonify(moviesBL.get_all_movies())


# get movie
@app.route('/movies/<string:id>', methods=['GET'])
def get_movie(id):
    return jsonify(moviesBL.get_movie(id))


# add movie
@app.route('/movies', methods=['POST'])
def add_movie():
    status = moviesBL.add_information(request.json)
    return jsonify(status)


# update movie
@app.route('/movies/<string:id>', methods=['PUT'])
def update_movie(id):
    return jsonify(moviesBL.update_information(id, request.json))


# delete movie
@app.route('/movies/<string:id>', methods=['DELETE'])
def delete_movie(id):
    moviesBL.delete_movie(id)
    return "deleted!!"


# get all members
@app.route('/members', methods=['GET'])
def get_all_members():
    return jsonify(membersBL.get_all_members())


# get member
@app.route('/members/<string:id>', methods=['GET'])
def get_member(id):
    return jsonify(membersBL.get_member(id))


# add member
@app.route('/members', methods=['POST'])
def add_member():
    status =membersBL.add_member(request.json)
    return jsonify(status)


# update member
@app.route('/members/<string:id>', methods=['PUT'])
def update_member(id):
    print("hey from update")
    print(request.json)
    return jsonify(membersBL.update_member(id, request.json))


# delete member
@app.route('/members/<string:id>', methods=['DELETE'])
def delete_member(id):
    membersBL.delete_member(id)
    return "deleted!!"


# get all subscriptions
@app.route('/subscriptions', methods=['GET'])
def get_all_subscriptions():
    return jsonify(subscriptionBL.get_all_subscriptions())


# get subscription
@app.route('/subscriptions/<string:id>', methods=['GET'])
def get_subscription(id):
    return jsonify(subscriptionBL.get_subscription(id))


# add subscription
@app.route('/subscriptions', methods=['POST'])
def add_subscription():
    status = subscriptionBL.add_subscription(request.json)
    return jsonify(status)


# update subscription
@app.route('/subscriptions/<string:id>', methods=['PUT'])
def update_subscription(id):
    print("main")
    return jsonify(subscriptionBL.update_subscription(id, request.json))


# delete subscription
@app.route('/subscriptions/<string:id>', methods=['DELETE'])
def delete_subscription(id):
    subscriptionBL.delete_subscription(id)
    return "deleted!!"


app.run()
