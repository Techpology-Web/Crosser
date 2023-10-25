from django.db import models
from django.core.files.storage import default_storage

class TempCrossFile(models.Model):
    file = models.ImageField(default=None, null=True)

    def save(self, *args, **kwargs):
        # this code will loop though and check if
        # file does not exist and if so removes the
        # model from the database
        for f in TempCrossFile.objects.all():
            file_exists = default_storage.exists(f.file.name)
            if not file_exists:
                print(f"file ({f.file.name}) not exist")
                try:
                    f.delete()
                except:pass
            else:
                print(f"file ({f.file.name}) exist")

        super(TempCrossFile, self).save(*args, **kwargs)


# Create your models here.
class Hash(models.Model):
    value = models.TextField(default="")
    compressed_value = models.TextField(default="")
    filename = models.TextField(default="")
    password = models.TextField(default="") # Any user knowing this password can use the hash
    compressed_size = models.PositiveIntegerField(default=0)
    decompressed_size = models.PositiveIntegerField(default=0)

    def get_hash_from_file(file):
        from requestHandler import hach
        return Hash.getHash(hach(f"./media/{file}"))

    def getHash(hash):
        hash_obj = Hash.objects.filter(value=hash)
        if len(hash_obj) > 0:
            return hash_obj[0]

        hash_obj = Hash.objects.filter(compressed_value=hash)
        if len(hash_obj) > 0:
            return hash_obj[0]

        return None
