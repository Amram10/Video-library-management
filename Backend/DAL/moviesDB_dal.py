#On this page we will get the database movies information.
from pymongo import MongoClient
from bson import ObjectId

class MoviesDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["moviesManagement"]
        self.__movies_collection = self.__db["Movies"]

    def get_all_movies(self):
        arr = []
        resp = self.__db["Movies"].find({})
        for movie in resp:
            arr.append(movie)
        return arr

    def get_movie(self, id):
        movie = self.__movies_collection.find_one({'_id': ObjectId(id)})
        return movie

    def add_movie(self, obj):
        self.__movies_collection.insert_one(obj)
        return obj["_id"]

    def update_movie(self, id, obj):
        return self.__movies_collection.update_one({"_id": ObjectId(id)}, {"$set": obj})

    def delete_movie(self, id):
        return self.__movies_collection.delete_one({'_id': ObjectId(id)})


