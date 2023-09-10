from django.shortcuts import render
from files.models import TempCrossFile, Hash
from requestHandler import *
from identification.models import User
import base64
# Create your views here.



def compress(request):
    if request.method == "POST":
        print(request.FILES)
        file = request.FILES["file"]
        
        f = TempCrossFile(file=file)
        f.save()
        return JsonResponse({"code":"sucessfully uploaded file"})
    else:
        return ErrorResponse("wrong method")

def share(request):
    if request.method == "POST":
        user = extractSession(request)
        to = User.objects.filter(pk=request.POST["to"])
        method = request.POST["method"]

        # if the to user exist we check if the user can unlcock the file
        # if so we share the hash depening of the method provided
         
        if len(to) > 0:
            file = request.FILES["file"]
            
            hash = argon(base64.b64decode(file.read()))
            hash_obj = Hash.getHash(hash)

            if user.can_unlock(hash_obj):
                if method == "0" : #share once
                    to[0].onetime_hashes.add(hash_obj) 
                elif method == "1" : # share forever
                    to[0].hashes.add(hash_obj) 
                else: return ErrorResponse("wrong method")

                to[0].save()
                return JsonResponse({"code":f"sucessfully shared hash to {to[0].username}"})
            else:
                return ErrorResponse("can't unlock file")
        else:
            return ErrorResponse("no to user was found")

    else:
        return ErrorResponse("wrong method")

def share_with_password(request):
    """
        password : string
        file     : file
        get the hash check if user can unlock
        set the hash password to password 
    """
    pass

"""
Share forever meands thath the user sends trhe file hash to 
the other user, meaning he can always open the file

Share once means that the user sends the hash to the other 
users onetime hash list which means when ever the hash is used
it gets deleted

Share with password sets the password for the user's hash which
means if a user tries to decompress a file and have the key they can


"""
