# On this page I'm running  the w.s subscriptions information.
import requests


class SubscriptionsWSDal:
    def __init__(self):
        pass

    def get_all_subscriptions(self, path):
        resp = requests.get("http://127.0.0.1:5000/"+path)
        return resp.json()

    def get_subscription(self, path, id):
        resp = requests.get("http://127.0.0.1:5000/"+path+"/"+id)
        return resp.json()

    def add_subscription(self, path, obj):
        requests.post("http://127.0.0.1:5000/"+path, json=obj)

    def update_subscription(self, path, id, obj):
        requests.put("http://127.0.0.1:5000/"+path+"/" + id, json=obj)

    def delete_subscription(self, path,  id):
        requests.delete("http://127.0.0.1:5000/"+path+"/" + id)

