from django.db import models
import uuid

# Create your models here. 
class Time_Zone(models.Model):
    tz_id = models.IntegerField("tz_id",primary_key=True,unique=True,default=1)
    tz_name = models.CharField("tz_name", max_length=50)

    class Meta:
        db_table = 'time_zones'
        managed = True
        verbose_name = 'Time_Zone'
        verbose_name_plural = 'Time_Zones'

    def __str__(self):
        return self.tz_id
    
class User(models.Model):
    user_id = models.UUIDField("user_id",primary_key=True,default=uuid.uuid4,editable=False)
    email =  models.CharField("tz_name", max_length=100)
    class Meta:
        db_table = 'users'
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Event(models.Model):
    #BE AWARE: uuid is not strickly unique, remember to take top row in your queries
    event_id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, 
        #allow user to be missing
        blank=True,
        null=True, 
        on_delete=models.CASCADE
        )
    tz = models.ForeignKey(
        Time_Zone, 
        default='1', 
        on_delete=models.CASCADE
        )
    location = models.CharField("location",max_length=250)
    summary = models.CharField("summary", max_length=50)
    description = models.CharField("description", max_length=500)

    class Meta:
        ordering = ['event_id']
        db_table = 'events'
        managed = True
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return self.event_id

class Event_Instance(models.Model):
    instance_id = models.UUIDField("insance_id",primary_key=True,default=uuid.uuid4,editable=False)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)
    dt_start = models.DateTimeField("dt_start", auto_now=False, auto_now_add=False)
    dt_end = models.DateTimeField("dt_end", auto_now=False, auto_now_add=False)

    class Meta:
        ordering = ['instance_id']
        db_table = 'event_instances'
        managed = True
        verbose_name = 'Event Instance'
        verbose_name_plural = 'Event Instances'