from django.conf import settings
from django.http import HttpResponse
import json
from passlib.hash import argon2

from identification.models import Session
    
def extractRequest(req):
    """
        This function is used to extract requestbody and parse it to a json
        We also retrieve the session value from the key and adds the session data
        (requestBody should contain sessionKey:<sessionkey> to get the session data in the request)
    """
    body = json.loads(req.body.decode('utf-8'))
    # if sessionKey exist add the session data to the body
    if "sessionKey" in req.headers:
        sessionKey = req.headers.get("sessionKey")
        print(sessionKey)
        sessionValue = Session.objects.filter(key=sessionKey)[0]
        body["session"] = sessionValue.user
    return body

def argon(password):
    return argon2.using(rounds = settings.ARGON_HASH_ROUNDS, salt = bytes(settings.ARGON_HASH_SALT, 'utf-8'), parallelism = settings.ARGON_HASH_PARALLELISM).hash(password)
 
class JsonResponse(HttpResponse):
    def __init__(self, data,status=200):
        super().__init__(json.dumps(data),status=status) 
