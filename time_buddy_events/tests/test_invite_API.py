import json
import os
from rest_framework import status
from rest_framework.test import APIRequestFactory
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Event, Event_Attendance, Time_Zone, User
from ..serializers import EventSerializer
from ..views import AttendanceViewSet

# guide https://medium.com/@kelsey88/testing-viewsets-with-fixtures-using-djangos-test-suite-example-6b42b2eede4c
# initialize the APIClient app
client = Client()

class Test_PUT_API_Events_Attendance(TestCase):
    """ Test module for updating an existing event record"""
    
    def set_up(self):
        # load event_2.json
        path = r"./time_buddy_events/test_objs/event_2.json"
        assert os.path.exists(path)
        json_file = open(path, "r")
        obj =json.load(json_file)
        
        # roll attendees out into list of users
        d={}
        for key, value in obj.items():
            d.setdefault(key,[]).append(value)
        #users = list(d['attendees'].values())[0]
        #users=d['attendees']
        users = []
        for value in d['attendees']:
            users = users.append(User(value))
        #check user list's form
        #self.assertEqual(user, "c9898565-e305-48e6-b05a-5b03cbc563f3")
        
        #create users and events
        #self.attendee = User.objects.create(user_id=users['0'], email='testEmail@gmail.com')
        #User.objects.bulk_create(users)
        user = User.objects.create(user_id='c9898565-e305-48e6-b05a-5b03cbc563f3')
        print(user)
        self.tz = Time_Zone(tz_name="AEST").save()
        self.asd_tutorial = Event.objects.create(summary='ASD Tutoral', location='UTS b02', description="this is NOT a test description", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
        
        #define valid and invalid payloads
        self.valid_payload = 'c9898565-e305-48e6-b05a-5b03cbc563f3'
        self.invalid_payload = 'bff535b2-23d0-4bd5-9675-bd8e604fe5f2'
        
        
        #self.valid_payload = Event_Attendance.objects.create(event_id=self.asd_tutorial.pk, user=self.attendees[0])
        #self.invalid_payload = Event_Attendance.objects.create(event_id=self.asd_tutorial.pk, user='bff535b2-23d0-4bd5-9675-bd8e604fe5f2')
    
    def test_attendance_viewset(self):
        #force setup
        self.set_up()
        
        #factory = APIRequestFactory()
        #view = AttendanceViewSet.as_view(actions={'get':'retrieve'})
        #attendance = []
        #for n in self.attendees:
        #    attendance = Event_Attendance(event_id=self.asd_tutorial, user=n)
        #attendance.save()#consider removing
        
        #request = factory.post(reverse(AttendanceViewSet, args=(self.valid_payload,)))
        #request = factory.post(reverse('', args=(self.valid_payload,)))
        #response = view(request)
        
        # test that update succeeds 
        #self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    #def test_invalid_post_attendance(self):
    #    #force setup
    #    self.set_up()
    #    
    #    #get response from putting invalid payload
    #    response= client.post(
    #        reverse('get_delete_update_event', kwargs={'pk':self.asd_tutorial.pk}),
    #        data=json.dumps(self.invalid_payload),
    #        content_type='application/json'
    #    )
    #    # test that update fails 
    #    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)