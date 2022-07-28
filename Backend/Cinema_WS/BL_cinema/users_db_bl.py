from Cinema_WS.DAL_cinema.DB_users_dal import *


class UsersLoginBL:
    def __init__(self):
        self.__users_db_dal = UsersDBDal()

# get all users
    def get_all_users(self):
        return self.__users_db_dal.get_all_users()

# get one user
    def get_user(self, id):
        user = self.__users_db_dal.get_user(id)
        return user

# add user
    def add_user(self, obj):
        user = {}
        user["UserName"] = obj["UserName"]
        user["Password"] = obj["Password"]
        self.__users_db_dal.add_user(user)
        return user["_id"]

# update user
    def update_user(self, id, obj):
        user = {}
        user["UserName"] = obj["UserName"]
        user["Password"] = obj["Password"]
        self.__users_db_dal.update_user(id, user)
        return "Updated !"

# delete user
    def delete_user(self, id):
        self.__users_db_dal.delete_user(id)
