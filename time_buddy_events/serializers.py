from django.db.models import fields
from rest_framework import serializers
from .models import Event

class Event_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id','user','tz','location','summary','description')