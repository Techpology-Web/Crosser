from django.shortcuts import render
from files.models import TempCrossFile, Hash
from requestHandler import *
from identification.models import User
import base64
import os
import time
import threading
from backend.settings import V8ROOT


compressed_size = "./compressed_size.txt"
compressed_output =   f"../{V8ROOT}/CF"
decompressed_output = f"../{V8ROOT}/DF"
media =               f"../{V8ROOT}/COMP"
db_folder =           f"../{V8ROOT}/DB/CDF"

def get_size(start_path = '.'):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return total_size

def getCompSize():
    comp_size = 0
    with open(compressed_size,"r") as f:
        comp_size = f.readline()
    return int(comp_size)

def addSize(size):
    size_as = getCompSize()
    with open(compressed_size,"w") as f:
        f.write(str(size_as+size))

def getDbSize(request):
    if request.method == "POST":
        comp_size = getCompSize()

        bod = {
            "decompressed_size": get_size()/2,
            "compressed_size":comp_size
        }

        return HttpResponse(json.dumps(bod))
    return HttpResponse("Hej")

# Create your views here.
def get_files(request):
    if request.method == "POST":
        req = extractRequest(request)
        user = req["session"]
        if user == None: return ErrorResponse("no session")
        hashes = []

        for hash in user.hashes.all():
            hashd = hash.__dict__
            del hashd["password"]
            del hashd["_state"]
            hashes.append(hashd)
        return JsonResponse({"hashes":hashes})

def hexToBytes(filename):
    buffer = ""
    path = get_output_file(decompressed_output,filename, False)
    print(path)
    # convert file contetns from hex to bytes
    try:
        with open(path, "r") as f:
            buffer = f.read()
        buffer = bytes.fromhex(buffer)

        with open(path,"wb") as f:
            f.write(buffer)
        print("changed from hex to bytes succesfully")
    except:
        pass
    return path


def decompress(request):
    if request.method == "POST":
        user = extractSession(request)
        if user == None: return ErrorResponse("no session")
        password = request.POST["password"]

        if password == None: return ErrorResponse("no password was sent")
        file = request.FILES["file"]
        f = TempCrossFile(file=file)
        f.save()

        hash = Hash.get_hash_from_file(file.name)
        if hash == None: return ErrorResponse("file not found")

        if user.can_unlock(hash):

            filename = file.name

            path = hexToBytes(filename)
            return JsonResponse({"code":"sucessfully uploaded file", "file":getUrl(path)})
        elif hash.password == argon(password):
            filename = file.name
            path = hexToBytes(filename)
            return JsonResponse({"code":"sucessfully uploaded file", "file":getUrl(path)})

        else: return ErrorResponse("can't unlock file")

    else:
        return ErrorResponse("wrong method")

"""
    we want to save the file
    then call the cross program to
    compress it. retrive the file
    and return it
"""

def get_output_file(folder, filename, extention=True):
    import glob

    # dont look with extention
    if extention == False:
        base = os.path.splitext(filename)[0]
        filename = base


    while not glob.glob(f"./{folder}/{filename}.*"):
        print(f"./{folder}/{filename} does not exist")
        time.sleep(2)

    return glob.glob(f"./{folder}/{filename}.*")[0]

def getUrl(path):

    url = ""
    #url = "http://localhost:8000"

    x = path[1:]
    path = os.path.join(*(x.split(os.path.sep)[3:]))

    return url+(path)

def compress(request):
    if request.method == "POST":
        user = extractSession(request)

        if user == None: return ErrorResponse("no session")

        file = request.FILES["file"]
        f = TempCrossFile(file=file)
        f.save()
        #generate hash
        hash = Hash(
            value=hach(f"{media}/"+file.name),
            filename=file.name,
            decompressed_size = file.size,      # to kb
            compressed_size   = 0
        )
        hash.save()
        user.hashes.add(hash)


        # saves the size of uploaded file
        user.decompressed_size += ( ( file.size )  ) # kbites


       # token = file.name.split("_")[0]

        filename = file.name

        #threading.Thread(target=lambda a: mv_file(compressed_output, filename), args=(["world"])).start()

        file_path = get_output_file(compressed_output, filename, False)

        file_stats = os.stat(file_path)
        hash.compressed_size = file_stats.st_size;
        hash.save()
        user.compressed_size += file_stats.st_size;
        user.save()
        addSize(file_stats.st_size)

        hash.compressed_value = hach(file_path)
        hash.save()
        # save compressed hash value aswell
        print(file_path[1:])

        return JsonResponse({"code":"sucessfully uploaded file","compressed_file":getUrl(file_path)})
    else:
        return ErrorResponse("wrong method")

def share(request):
    if request.method == "POST":

        user = extractSession(request)
        
        if user == None: return ErrorResponse("No session")

        to = User.objects.filter(pk=request.POST["to"])
        method = request.POST["method"]

        # if the to user exist we check if the user can unlcock the file
        # if so we share the hash depening of the method provided
         
        if len(to) > 0:
            file = request.FILES["file"]

            f = TempCrossFile(file=file)
            f.save()
            
            hash_obj = Hash.get_hash_from_file(file.name)
            if hash_obj == None: return ErrorResponse("file not found")

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
    if request.method == "POST":

        user = extractSession(request)
        password = request.POST["password"]
        
        if user == None: return ErrorResponse("No session")

        # if the to user exist we check if the user can unlcock the file
        # if so we share the hash depening of the method provided
         
        file = request.FILES["file"]
        f = TempCrossFile(file=file)
        f.save()
        
        hash_obj = Hash.get_hash_from_file(file.name)
        if hash_obj == None: return ErrorResponse("file not found")

        if user.can_unlock(hash_obj):
            hash_obj.password = argon(password)
            hash_obj.save()
            return JsonResponse({"code":f"sucessfully set password"})
        else:
            return ErrorResponse("can't unlock file")

    else:
        return ErrorResponse("wrong method")

"""
Share forever meands thath the user sends trhe file hash to 
the other user, meaning he can always open the file

Share once means that the user sends the hash to the other 
users onetime hash list which means when ever the hash is used
it gets deleted

Share with password sets the password for the user's hash which
means if a user tries to decompress a file and have the key they can


"""
