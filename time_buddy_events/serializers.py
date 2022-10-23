from django.db.models import fields
from rest_framework import serializers
from .models import Event, User, Time_Zone

class TimeZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time_Zone
        fields = '__all__'     
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    attandees = UserSerializer(many=True, read_only=True) #not sure about read only
    
    class Meta:
        model = Event
        fields = '__all__'
        #fields = ('event_id','location','summary','description','dt_start', 'dt_end')
        
#class EventAttendanceSerializer(serializers.ModelSerializer):
#    event = EventSerializer(many=False, read_only=True) 
#    # read_only=True should mean only members can be invited
#    attendees = UserSerializer(many=True, read_only=True)
#    class Meta:
#        ordering = ['-event_id']
#        model = Event
#        fields = ('attendance_id','event_id''user_id')
#        #extra_kwargs = {'attendance_id': {required:False}} #not necessary due to defaults