# On this page we get the permissions  information from json file.
import json
import os
import sys


class PermissionsFileDal:
    def __init__(self):
        self.__path = os.path.join(sys.path[0], "../Json_Data/Permissions.json")

    def get_all_permissions(self):
        f = open(self.__path, 'r')
        data = json.load(f)
        print(f)
        print(data)
        return data["Permissions"]

# This function update permission
    def update_permission(self, obj):
        f = open(self.__path, 'w')
        json.dump(obj, f)
        f.close()

# This function add permission
    def add_permission(self, obj):
        f = open(self.__path, 'w')
        json.dump(obj, f)
        f.close()

# This function delete permission
    def delete_permission(self, index):
        f = open(self.__path, 'r')
        data = json.load(f)
        f.close()
      #  permissions = data["Permissions"]
        data["Permissions"].pop(index)
        f = open(self.__path, 'w')
        json.dump(data, f)
        f.close()
