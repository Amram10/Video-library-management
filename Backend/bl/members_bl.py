from DAL.membersWS_dal import *
from DAL.membersDB_dal import *


class MembersBL:
    def __init__(self):
        self.__members_ws_dal = MembersWsDAL()
        self.__members_db_dal = MembersDBDal()

# get all members
    def get_all_members(self):
        members = []
        ws_members = self.__members_ws_dal.get_all_members()
        for member in ws_members:
            membr = {}
            membr["name"] = member["name"]
            membr["email"] = member["email"]
            membr["city"] = member["address"]["city"]
            members.append(membr)
        if len(list(self.__members_db_dal.get_all_members())) == 0:
            for member in members:
                self.__members_db_dal.add_member(member)
        else:
            return self.__members_db_dal.get_all_members()
        return members

#get one member
    def get_member(self, id):
        member = self.__members_db_dal.get_member(id)
        return member

#add member
    def add_member(self, obj):
        print(obj)
        member = {}
        member["name"] = obj["name"]
        member["email"] = obj["email"]
        member["city"] = obj["city"]
        id = self.__members_db_dal.add_member(member)
        self.__members_ws_dal.add_member({"name": obj["name"], "email": obj["email"], "city": obj["city"]})
        return id

#update member
    def update_member(self, id, obj):
        member = {}
        print(obj)
        member["name"] = obj["name"]
        member["email"] = obj["email"]
        member["city"] = obj["city"]
        self.__members_db_dal.update_member(id, member)
        return "Udpated !"

#deletee member
    def delete_member(self, id):
        self.__members_db_dal.delete_member(id)




