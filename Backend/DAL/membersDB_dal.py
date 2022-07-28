#On this page we will get the database users information.
from pymongo import MongoClient
from bson import ObjectId

class MembersDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["moviesManagement"]
        self.__members_collection = self.__db["Members"]

    def get_all_members(self):
        arr = []
        resp = self.__members_collection.find({})
        for member in resp:
            arr.append(member)
        return arr

    def get_member(self, id):
        member = self.__members_collection.find_one({'_id': ObjectId(id)})
        return member

    def add_member(self, obj):
        self.__members_collection.insert_one(obj)
        return str(obj["_id"])

    def update_member(self, id, obj):
        return self.__members_collection.update_one({"_id": ObjectId(id)}, {"$set": obj})

    def delete_member(self, id):
        return self.__members_collection.delete_one({'_id': ObjectId(id)})


