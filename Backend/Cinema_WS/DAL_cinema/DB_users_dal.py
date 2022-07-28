# On this page we will get the database users information.
from pymongo import MongoClient
from bson import ObjectId

class UsersDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["moviesManagement"]
        self.__users_collection = self.__db["UsersLogin"]

    def get_all_users(self):
        arr = []
        resp = self.__users_collection.find({})
        for user in resp:
            arr.append(user)
        return arr

    def get_user(self, id):
        user = self.__users_collection.find_one({'_id': ObjectId(id)})
        return user

    def add_user(self, obj):
        self.__users_collection.insert_one(obj)

    def update_user(self, id, obj):
        return self.__users_collection.update_one({"_id": ObjectId(id)}, {"$set": obj})

    def delete_user(self, id):
        return self.__users_collection.delete_one({'_id': ObjectId(id)})


