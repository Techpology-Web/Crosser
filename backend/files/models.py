from django.db import models

# Create your models here.
class Hash(models.Model):
    value = models.TextField()
    password = models.TextField(default="") # Any user knowing this password can use the hash


