from django.conf import settings
from django.http import HttpResponse
import json
from passlib.hash import argon2
from identification.models import User

from identification.models import Session
    
def extractRequest(req):
    if(req.method == "POST"):
        body = json.loads(req.body.decode('utf-8'))
        # if sessionKey exist add the session data to the body
        if "sessionKey" in req.headers:
            sessionKey = req.headers.get("sessionKey")
            try:
                sessionValue = Session.objects.filter(key=sessionKey)[0]
                body["session"] = sessionValue.user
            except:pass
        return body
    return req
def extractSession(req) -> User:
    if "sessionKey" in req.headers:
        sessionKey = req.headers.get("sessionKey")
        try:
            sessionValue = Session.objects.filter(key=sessionKey)[0]
            return sessionValue.user
        except:pass
    return None 

def argon(password):
    return argon2.using(rounds = settings.ARGON_HASH_ROUNDS, salt = bytes(settings.ARGON_HASH_SALT, 'utf-8'), parallelism = settings.ARGON_HASH_PARALLELISM).hash(password)
 
class JsonResponse(HttpResponse):
    def __init__(self, data,status=200):
        super().__init__(json.dumps(data),status=status) 

class ErrorResponse(HttpResponse):
    def __init__(self, data,status=400):
        super().__init__(json.dumps({"code":data}),status=status) 
