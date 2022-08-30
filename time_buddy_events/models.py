from django.db import models

# Create your models here.
class event(models.Model):
    event_id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)

    #BE AWARE: uuid is not strickly unique, remember to take top row in your queries
    user_id = models.ForeignKey("user_id", verbose_name=_("User ID"), on_delete=models.CASCADE)
    tz_id = models.ForeignKey("tz_id", verbose_name=_("Time Zone ID"), on_delete=models.CASCADE)
    location = models.CharField(_("Location"), max_length=250)
    summary = models.CharField(_("Summary"), max_length=50)
    description = models.CharField(_("Description"), max_length=500)

    class Meta:
        db_table = 'events'
        managed = True
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return self.name
    
class event_instance(model.Models):
    instance_id = models.UUIDField("insance_id",verbose_name=_("instance_id"),primary_key=True,default=uuid.uuid4,editable=false)
    dt_start = models.DateTimeField(_(""), auto_now=False, auto_now_add=False)
    dt_end = models.DateTimeField(_(""), auto_now=False, auto_now_add=False)

    class Meta:
        db_table = 'event_instances'
        managed = True
        verbose_name = 'Event Instance'
        verbose_name_plural = 'Event Instances'
    
    
class time_zone(model.Models):
    tz_id = models.IntegerField("tz_id",verbose_name=_("Time Zone ID")),primary_key=True,unique=True,default=1)
    tz_name = models.CharField("tz_name",verbose_name=_("Time Zone Name"), max_length=50)

    class Meta:
        db_table = 'time_zones'
        managed = True
        verbose_name = 'Time_Zone'
        verbose_name_plural = 'Time_Zones'

   
    def __str__(self):
        return self.name
    
class user(model.Models):
    user_id = models.UUIDField("user_id",verbose_name=_("User ID"),primary_key=True,default=uuid.uuid4,editable=false)

    class Meta:
        db_table = 'users
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    