from Cinema_WS.DAL_cinema.JSON_users_dal import *


class UsersBL:
    def __init__(self):
        self.__users_json_dal = UsersFileDal()

# get all users
    def get_all_users(self):
        json_users = self.__users_json_dal.get_all_users()
        return json_users

# get one user
    def get_user(self, id):
        user = self.__users_json_dal.get_all_users()
        user = list(filter(lambda x: x["_id"] == id, user))
        return user

# add user
    def add_usr(self, obj):
        usr = self.__users_json_dal.get_all_users()
        usr.append(obj)
        object = {"users": usr}
        self.__users_json_dal.add_user(object)
        return "Add user"

# update user
    def update_user(self, id, obj):
        users = self.__users_json_dal.get_all_users()
        for user in users:
            if user["_id"] == id:
                user["first_name"] = obj["first_name"]
                user["last_name"] = obj["last_name"]
                user["created_date"] = obj["created_date"]
                user["SessionTimeOut"] = obj["SessionTimeOut"]
        object = {"users": users}
        self.__users_json_dal.update_user(object)
        return "Updated !"

# delete user
    def delete_user(self, id):
        users = self.__users_json_dal.get_all_users()
        index = 0
        isId=False
        for user in users:
            if user["_id"] == id:
                isId= True
                break
            index += 1
        if isId==True:
           self.__users_json_dal.delete_user(index)

