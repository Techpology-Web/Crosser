from django.conf import settings
from django.http import HttpResponse
import json
from passlib.hash import argon2

from identification.models import Session
    
def extractRequest(req):
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
