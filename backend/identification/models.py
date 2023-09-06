from django.db import models
from argon2 import PasswordHasher
from files.models import Hash

# Create your models here.
class User(models.Model):

    username = models.TextField()
    password = models.TextField()

    hashes = models.ManyToManyField(to=Hash) # hashes to verify files

    decompressed_size = models.IntegerField() # real size
    compressed_size = models.IntegerField()   # compressed size


class Session(models.Model):
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    key = models.TextField()
