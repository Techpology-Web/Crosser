from django.db import models


class TempCrossFile(models.Model):
    file = models.ImageField(default=None, null=True)
    


# Create your models here.
class Hash(models.Model):
    value = models.TextField()
    password = models.TextField(default="") # Any user knowing this password can use the hash
    def getHash(hash):
        hash_obj = Hash.objects.filter(value=hash)
        if len(hash_obj) > 0:
            return hash_obj[0]
        else: return None
