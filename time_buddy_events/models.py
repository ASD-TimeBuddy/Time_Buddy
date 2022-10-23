from xmlrpc.client import boolean
from django.db import models
import uuid

# Create your models here. 
# to be moved to another (USER) app
class Time_Zone(models.Model):
    tz_id = models.IntegerField("tz_id",primary_key=True,unique=True,default=1)
    tz_name = models.CharField("tz_name", max_length=50)

    class Meta:
        db_table = 'time_zones'
        managed = True
        verbose_name = 'Time_Zone'
        verbose_name_plural = 'Time_Zones'

    def __str__(self):
        return self.tz_name
# to be moved to another (USER) app
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
    dt_start = models.DateTimeField("dt_start", auto_now=False, auto_now_add=False)
    dt_end = models.DateTimeField("dt_end", auto_now=False, auto_now_add=False)
    attendees = models.ManyToManyField('User', related_name='Attendance', through='Attendance')
    class Meta:
        ordering = ['event_id']
        db_table = 'events'
        managed = True
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return self.summary

# https://docs.djangoproject.com/en/4.1/topics/db/models/#intermediary-manytomany
class Attendance(models.Model):
    class Meta:
        unique_together = (('user','event'))
        ordering =['event']
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    is_attending = models.BooleanField(default=0)

  
# class Event_Attendance(models.Model):
#     attendance_id = models.UUIDField("insance_id",primary_key=True,default=uuid.uuid4,editable=False)
#     event = models.ForeignKey(Event, on_delete=models.CASCADE)
#     user= models.ForeignKey(
#         User, 
#         #allow user to be missing
#         blank=False,
#         null=False, 
#         on_delete=models.CASCADE
#         )

#     class Meta:
#         ordering = ['attendance_id']
#         db_table = 'event_attendance'
#         managed = True
#         verbose_name = 'Event attendance'
#         verbose_name_plural = 'Event attendance'