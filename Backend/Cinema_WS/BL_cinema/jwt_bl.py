
import jwt
from flask import make_response


from Cinema_WS.BL_cinema.users_db_bl import *


class JwtBL:
    def __init__(self):
        self.__key = "secret"
        self.__algorithm = "HS256"
        self.__usersLogin = UsersLoginBL()

    # Check existence of that user in data source and if exists - returns a unique value
    def check_user(self, username, password):
        users = self.__usersLogin.get_all_users()
        for user in users:
            if (user["UserName"] == username) and (user["Password"] == password):
                return str(user["_id"])
        return "Wrong user"

    # get token
    def get_token(self, username, password):
        user_id = self.check_user(username, password)
        key = "secret"
        if user_id is not False:
            token = jwt.encode({"userid": user_id}, "secret", algorithm="HS256")
            print(token)
            return make_response({"token": token}, 200)
        else:
            return make_response({"error": "Your not authorized"}, 401)

    # verify token
    def verify_token(self, token):
        data = jwt.decode(token, self.__key, self.__algorithm)
        user_id = data["userid"]
        # Check existence of that user id...
        return True
