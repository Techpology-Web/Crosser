from django.shortcuts import render
from requestHandler import extractRequest
from django.http import HttpResponse
import json

# Create your views here.


def create_user(request):
    if request.method == "POST":
        req = extractRequest(request)

    return HttpResponse(json.dumps({"test":"idk"}))
