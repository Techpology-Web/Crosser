from django.conf import settings
import json

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
        try:
            sessionValue = Session.objects.get(key=sessionKey)
            body["session"] = sessionKey.user
        except: pass
    return body

 

