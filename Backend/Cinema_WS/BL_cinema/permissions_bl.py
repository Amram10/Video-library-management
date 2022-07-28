from Cinema_WS.DAL_cinema.JSON_permissions_dal import*


class PermissionBL:
    def __init__(self):
        self.__Permission_json_dal = PermissionsFileDal()

# get all permissions
    def get_all_permissions(self):
        json_permissions = self.__Permission_json_dal.get_all_permissions()
        return json_permissions

# get one user
    def get_permission(self, id):
        permission = self.__Permission_json_dal.get_all_permissions()
        permission = list(filter(lambda x: x["_id"] == id, permission))
        return permission

# add user
    def add_permission(self, obj):
        permission = self.__Permission_json_dal.get_all_permissions()
        permission.append(obj)
        object={}
        object ["Permissions"]= permission
        self.__Permission_json_dal.add_permission(object)
        return "Add permission"

# update permission
    def update_permission(self, id, obj):
        permissions = self.__Permission_json_dal.get_all_permissions()
        for permission in permissions:
            if permission['_id'] == id:
                permission["permissions"][0]["ViewSubscriptions"] = obj["permissions"][0]["ViewSubscriptions"]
                permission["permissions"][1]["CreatSubscriptions"] = obj["permissions"][1]["CreatSubscriptions"]
                permission["permissions"][2]["DeleteSubscriptions"] = obj["permissions"][2]["DeleteSubscriptions"]
                permission["permissions"][3]["UpdateSubscriptions"] = obj["permissions"][3]["UpdateSubscriptions"]
                permission["permissions"][4]["ViewMovies"] = obj["permissions"][4]["ViewMovies"]
                permission["permissions"][5]["CreatMovies"] = obj["permissions"][5]["CreatMovies"]
                permission["permissions"][6]["DeleteMovies"] = obj["permissions"][6]["DeleteMovies"]
                permission["permissions"][7]["UpdateMovies"] = obj["permissions"][7]["UpdateMovies"]
        object = {"Permissions": permissions}
        self.__Permission_json_dal.update_permission(object)
        return "Updated !"

# delete permission
    def delete_permission(self, id):
        permissions = self.__Permission_json_dal.get_all_permissions()
        isId = False
        index = 0
        for permission in permissions:
            if permission["_id"] == id:
                isId = True
                break
            index += 1
            print(index)
        if isId==True:
            self.__Permission_json_dal.delete_permission(index)
        return "Deleted !!"