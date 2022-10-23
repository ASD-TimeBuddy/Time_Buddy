from django.db import models
import uuid

# Should have a uuid, but didn't for certain reasons
class Organisation(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    address = models.CharField(max_length=31,unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    
