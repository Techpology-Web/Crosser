from django.shortcuts import render
from requestHandler import *
from django.http import HttpResponse
import json
from identification.models import User, Session
import time


def deleteSession(request):
    if request.method == "POST":
        req = extractRequest(request)
        if req["key"] == "deus ego sum et deleo":
            sessionid = req["sessionKey"]
            session = Session.objects.filter(key=sessionid)[0]
            session.delete()

            return HttpResponse("Session was deleted")
        return ErrorResponse("Wrong key")
    return ErrorResponse("Wrong Method")


def getSessions(request):
    if request.method == "POST":
        req = extractRequest(request)
        if req["key"] == "ego sum Deus":
            sessions = Session.objects.all()
            s = []
            for session in sessions:
                s.append({
                    "long":session.long,
                    "lat":session.lat,
                    "created":session.created.timestamp(),
                    "name":session.user.username,
                    "key":session.key,
                })
            return JsonResponse(s)
        return ErrorResponse("wrong key")
    return ErrorResponse("wrong method")


def log_in(request):
    if request.method == "POST":
        req = extractRequest(request)
        username = req["username"]
        password = argon(req["password"])
        users = User.objects.filter(username=username, password=password)
        if len(users) == 0:
            return JsonResponse({"code":"Wrong credentials"},status=401)
        
        session = Session(user=users[0],
                          key=argon(password+str(time.time())),
                          long=req["long"],
                          lat=req["lat"],
                          )
        session.save()

        return JsonResponse({"sessionKey":session.key})

def get_user_info(request):
    if request.method == "POST":
        user = extractSession(request)
        if user == None: return ErrorResponse("no session")
    return JsonResponse({"username":user.username, "compressed_size":user.compressed_size, "decompressed_size":user.decompressed_size})

def get_users(request):
    if request.method == "GET":
        req = extractRequest(request)
        users = []
        for user in User.objects.all():
            users.append({"username":user.username, "pk":user.pk})
        print(users)
        return JsonResponse(users)
    return ErrorResponse("wrong method")

def create_user(request):
    if request.method == "POST":
        req = extractRequest(request)
        try:
            username = req["username"]
            password = argon(req["password"])

            users = User.objects.filter(username=username)
            if len(users) > 0:
                return JsonResponse({"code":"User allredy exists"},status=400)

            new_user = User(
                username=username, 
                password=password,
            )
            new_user.save()
            return JsonResponse({"code":"User created"},status=201)
        except Exception as e:
            return JsonResponse({"error":"Something went wrong","value":str(e)},status=400)
        
    return JsonResponse({"code":"Wrong method"},status=404)
