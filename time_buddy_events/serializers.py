from django.db.models import fields
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        #fields = ('event_id','location','summary','description')

class EventInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

        
class TimeZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'     
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

