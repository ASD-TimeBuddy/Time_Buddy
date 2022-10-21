from django.db import models

# Should have a uuid, but didn't for certain reasons
class Organisation(models.Model):
    organisation_id = models.IntegerField(max_length=6, min_length=6)
    group_name = models.CharField(max_length=100)
    group_password = models.CharField(max_length=100)

    
