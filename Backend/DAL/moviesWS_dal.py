#On this page we will link to the information obtained from WebService
import requests


class MoviesWsDAL:
    def __init__(self):
        pass

    def get_all_movies(self):
        resp = requests.get("https://api.tvmaze.com/shows")
        return resp.json()

    def add_movie(self, obj):
        requests.post("https://api.tvmaze.com/shows", json=obj)
