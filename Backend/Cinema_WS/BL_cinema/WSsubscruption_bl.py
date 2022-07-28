# On this page I'm running  the w.s subscriptions information from DAL page.
import requests
from Cinema_WS.DAL_cinema.WS_subscriptions_dal import *


class Ws_subscription_bl:
    def __init__(self):
        self.__subscriptions_ws_dal = SubscriptionsWSDal()

# Get the information I want according to the path given to me
    def get_all_information(self, path):
        return self.__subscriptions_ws_dal.get_all_subscriptions(path)

# Get the information I want according to the path given to me
    def get_one_information(self, path, id):
        return self.__subscriptions_ws_dal.get_subscription(path, id)

# Add information according to the path provided
    def add_information(self, path, obj):
        self.__subscriptions_ws_dal.add_subscription(path, obj)
        return "Add information"

# Update information according to the path provided
    def update_information(self, path, id, obj):
        self.__subscriptions_ws_dal.update_subscription(path, id, obj)
        return "Information updated!"

# Delete information according to the path provided
    def delete_information(self, path, id):
        self.__subscriptions_ws_dal.delete_subscription(path, id)


