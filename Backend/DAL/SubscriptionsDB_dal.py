#On this page we will get the database Subscriptions information.
from pymongo import MongoClient
from bson import ObjectId

class SubscriptionsDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["moviesManagement"]
        self.__subscriptions_collection = self.__db["Subscriptions"]

    def get_all_subscriptions(self):
        arr = []
        resp = self.__subscriptions_collection.find({})
        for sub in resp:
            arr.append(sub)
        print(arr)
        return arr

    def get_subscription(self, id):
        member = self.__subscriptions_collection.find_one({'_id': ObjectId(id)})
        return member

    def add_subscription(self, obj):
        self.__subscriptions_collection.insert_one(obj)

    def update_subscription(self, id, obj):
        return self.__subscriptions_collection.update_one({"_id": ObjectId(id)}, {"$set": obj})

    def delete_subscription(self, id):
        return self.__subscriptions_collection.delete_one({'_id': ObjectId(id)})


