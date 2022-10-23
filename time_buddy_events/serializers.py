from django.db.models import fields
from rest_framework import serializers
from .models import Event, User, Attendance, Time_Zone

class TimeZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time_Zone
        fields = '__all__'     
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        #fields = '__all__'
        fields = ('event','user','is_attending')
    def create(self, validated_data):
        #don't duplicate entires
        if not Attendance.objects.filter(**validated_data).exists():
            Attendance.objects.create(**validated_data)
        return Attendance.objects.filter(**validated_data)

class EventSerializer(serializers.ModelSerializer):
    attendance = AttendanceSerializer(many=True, read_only=True) #not sure about read only
    
    class Meta:
        model = Event
        fields = '__all__'
        #fields = ('event_id','location','summary','description','dt_start', 'dt_end')
        
    def create(self, validated_data):
        attendance_data = validated_data.pop('attendance')
        event = Event.objects.create(**validated_data)
        #attendance = Attendance.objects.bulk_create(attendance_data)
        for attendee_data in attendance_data:
            Attendance.objects.create(event=event,**attendee_data)
        return Attendance.objects.filter(event=event)
              
    # def update(self, instance, validated_data):
    #     attendance = validated_data.pop('attendees')
    #     # ... logic to save attendee for this instance
    
    #     return instance
        