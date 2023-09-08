from django.db import models
from argon2 import PasswordHasher
from files.models import Hash

# Create your models here.
class User(models.Model):

    username = models.TextField()
    password = models.TextField()

    hashes = models.ManyToManyField(to=Hash) # hashes to verify files
    onetime_hashes = models.ManyToManyField(to=Hash) # hashes to verify files can only be used once

    decompressed_size = models.PositiveIntegerField(default=0) # real size
    compressed_size = models.PositiveIntegerField(default=0)   # compressed size

    def unlock_file(self, hash):
        """
            if hash is inside hash return true
            is hash is inside onetime_hash return true and remove the hash
        """
        pass
    
    



class Session(models.Model):
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    key = models.TextField()
