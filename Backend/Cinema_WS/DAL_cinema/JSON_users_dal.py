# On this page we get the users  information from json file.
import json
import os
import sys
class UsersFileDal:
    def __init__(self):
        self.__path = os.path.join(sys.path[0], "../Json_Data/users.json")

    def get_all_users(self):
        f = open(self.__path, 'r')
        data = json.load(f)
        return data["users"]

# This function update user
    def update_user(self, obj):
        f = open(self.__path, 'w')
        json.dump(obj, f)
        f.close()

# This function add user
    def add_user(self, obj):
        f = open(self.__path, 'w')
        json.dump(obj, f)
        f.close()


    def delete_user(self, index):
        f = open(self.__path, 'r')
        data = json.load(f)
        f.close()
      #  users = data["users"]
        #print(data)
        data["users"].pop(index)
        f = open(self.__path, 'w')
        json.dump(data, f)
        f.close()

