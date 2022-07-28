import requests


class MembersWsDAL:
    def __init__(self):
        pass

    def get_all_members(self):
        resp = requests.get("https://jsonplaceholder.typicode.com/users")
        return resp.json()

    def add_member(self, obj):
        requests.post("https://jsonplaceholder.typicode.com/users", json=obj)