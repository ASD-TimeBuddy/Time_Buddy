from tokenize import group
from django.db import models
import uuid

# Create your models here. 
class Organisation(models.Model):
    organisation_id = models.IntegerField("organisation_id",primary_key=True,unique=True,default=1)
    organisation_name = models.CharField("organisation_name", max_length=50)

    class Meta:
        db_table = 'organisations'
        managed = True
        verbose_name = 'Organisation'
        verbose_name_plural = 'Organisations'
    
class Group(models.Model):
    group_id = models.UUIDField("group_id",primary_key=True,default=uuid.uuid4,editable=False)
    group_name = models.CharField("group_name", max_length=50)
    
    organisation = models.ForeignKey(
        Organisation, 
        #allow group to be missing
        blank=True,
        null=True, 
        on_delete=models.CASCADE
        )
    
    description = models.CharField("description", max_length=500)
    
    class Meta:
        ordering = ['group_id']
        db_table = 'groups'
        managed = True
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'
        
    def __str__(self):
        return self.group_id

class Group_Instance(models.Model):
    instance_id = models.UUIDField("instance_id",primary_key=True,default=uuid.uuid4,editable=False)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
    
    #start here - change so you can add a group
    dt_start = models.DateTimeField("dt_start", auto_now=False, auto_now_add=False)
    dt_end = models.DateTimeField("dt_end", auto_now=False, auto_now_add=False)
    #end here

    class Meta:
        ordering = ['instance_id']
        db_table = 'group_instances'
        managed = True
        verbose_name = 'Group Instance'
        verbose_name_plural = 'Group Instances'