from DAL.moviesWS_dal import *
from DAL.moviesDB_dal import *


class MoviesBL:
    def __init__(self):
        self.__movies_ws_dal = MoviesWsDAL()
        self.__movies_db_dal = MoviesDBDal()

    def get_all_movies(self):
        movies_ws = self.__movies_ws_dal.get_all_movies()
        movies = []
        for movie in movies_ws:
            obj = {}
            obj["name"] = movie["name"]
            obj["genres"] = movie["genres"]
            obj["image"] = movie["image"]["original"]
            obj["premiered"] = movie["premiered"]
            movies.append(obj)
        if len(list(self.__movies_db_dal.get_all_movies())) == 0:
            for movie in movies:
                self.__movies_db_dal.add_movie(movie)
        else:
            return self.__movies_db_dal.get_all_movies()
        return movies

    def get_movie(self, id):
        movie = self.__movies_db_dal.get_movie(id)
        return movie

    def add_information(self, obj):
        movie = {}
        movie["name"] = obj["name"]
        movie["genres"] = obj["genres"]
        movie["premiered"] = obj["premiered"]
        movie["image"] = obj["image"]
        self.__movies_db_dal.add_movie(movie)
        print("moviesBL")
        return movie["_id"]

    def update_information(self, id, obj):
        movie = {}
        movie["name"] = obj["name"]
        movie["genres"] = obj["genres"]
        movie["premiered"] = obj["premiered"]
        movie["image"] = obj["image"]
        self.__movies_db_dal.update_movie(id, movie)
        return "Udpated !"

    def delete_movie(self, id):
        self.__movies_db_dal.delete_movie(id)
