from DAL.moviesDB_dal import *
from DAL.membersDB_dal import *
from DAL.SubscriptionsDB_dal import *


class SubscriptionsBL:
    def __init__(self):
        self.__movies_db_dal = MoviesDBDal()
        self.__members_db_dal = MembersDBDal()
        self.__subscriptions_db_dal = SubscriptionsDBDal()

# get all subscriptions
    def get_all_subscriptions(self):
        subscriptions = []
        db_subscriptions = self.__members_db_dal.get_all_members()
        for subscription in db_subscriptions:
            sub = {}
            sub["member_id"] = subscription["_id"]
            sub["movies"] = []
            subscriptions.append(sub)
        if len(list(self.__subscriptions_db_dal.get_all_subscriptions())) == 0:
            for sub in subscriptions:
                self.__subscriptions_db_dal.add_subscription(sub)
        else:
            return self.__subscriptions_db_dal.get_all_subscriptions()
        return subscriptions

# get one subscription
    def get_subscription(self, id):
        sub = self.__subscriptions_db_dal.get_subscription(id)
        return sub

# add subscription
    def add_subscription(self, obj):
        sub = {}
        sub["member_id"] = obj["member_id"]
        sub["movies"] = obj["movies"]
        self.__subscriptions_db_dal.add_subscription(sub)
        print("subscription")
        return str(sub["_id"])

# update subscription
    def update_subscription(self, id, obj):
        sub = {}
        print(obj)
        sub["member_id"] = obj["member_id"]
        sub["movies"] = obj["movies"]
        self.__subscriptions_db_dal.update_subscription(id, sub)
        return "Updated !"

# delete subscription
    def delete_subscription(self, id):
        self.__subscriptions_db_dal.delete_subscription(id)




