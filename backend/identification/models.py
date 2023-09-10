from django.db import models
from argon2 import PasswordHasher
from files.models import Hash

# Create your models here.
class User(models.Model):

    username = models.TextField()
    password = models.TextField()

    hashes         = models.ManyToManyField(to=Hash, related_name="hashes", blank=True) # hashes to verify files
    onetime_hashes = models.ManyToManyField(to=Hash, related_name="onetime_hashes",blank=True) # hashes to verify files can only be used once

    decompressed_size = models.PositiveIntegerField(default=0) # real size
    compressed_size = models.PositiveIntegerField(default=0)   # compressed size

    def can_unlock(self, hash_obj:Hash):
        """
            returns true if user has the hash
        """
        # if the user has it in the one time hashes we remove the hash
        # and then return true
        print(self.username)
        if hash_obj in self.hashes.all(): return True
        if hash_obj in self.onetime_hashes.all():
            self.onetime_hashes.remove(hash_obj)
            return True
        return False
    
    
    



class Session(models.Model):
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    key = models.TextField()