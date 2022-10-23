from django.db import models

# Should have a uuid, but didn't for certain reasons
class Organisation(models.Model):
    organisation_id = models.CharField(max_length=15, unique=True)
    group_name = models.CharField(max_length=100)
    group_password = models.CharField(max_length=100)

    
