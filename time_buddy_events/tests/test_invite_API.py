import json
import os
from rest_framework import status
from rest_framework.test import APIRequestFactory
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Attendance, Event, Time_Zone, User
from ..serializers import EventSerializer, AttendanceSerializer
from ..views import AttendeesViewSet

# guide https://medium.com/@kelsey88/testing-viewsets-with-fixtures-using-djangos-test-suite-example-6b42b2eede4c
# initialize the APIClient app
client = Client()

class Test_PUT_API_Events_Attendance(TestCase):
    """ Test module for updating an existing event record"""
    
    def set_up(self):
        # load event_2.json
        # path = r"./time_buddy_events/test_objs/event_2.json"
        # assert os.path.exists(path)
        # json_file = open(path, "r")
        # obj =json.load(json_file)
        
        # # roll attendees out into list of users
        # d={}
        # for key, value in obj.items():
        #     d.setdefault(key,[]).append(value)
        # #users = list(d['attendees'].values())[0]
        # #users=d['attendees']
        # users = []
        # for value in d['attendees']:
        #     users = users.append(User(value))
        # #check user list's form
        #self.assertEqual(user, "c9898565-e305-48e6-b05a-5b03cbc563f3")
        
        #create users and events
        #self.attendee = User.objects.create(user_id=users['0'], email='testEmail@gmail.com')
        #User.objects.bulk_create(users)
        user = User.objects.create(user_id='c9898565-e305-48e6-b05a-5b03cbc563f3')
        user_2 = User.objects.create(user_id='14991368-2cfc-47ac-ad5f-3ffe80052c9b')
        print(user)
        self.tz = Time_Zone(tz_name="AEST").save()
        self.asd_tutorial = Event.objects.create(summary='ASD Tutoral', location='UTS b02', description="this is NOT a test description", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
        Attendance.objects.create(event=self.asd_tutorial,user=user)
        Attendance.objects.create(event=self.asd_tutorial,user=user_2)
        #define valid and invalid payloads
        self.valid_payload = 'c9898565-e305-48e6-b05a-5b03cbc563f3'
        self.invalid_payload = 'bff535b2-23d0-4bd5-9675-bd8e604fe5f2'
        
        
        #self.valid_payload = Event_Attendance.objects.create(event_id=self.asd_tutorial.pk, user=self.attendees[0])
        #self.invalid_payload = Event_Attendance.objects.create(event_id=self.asd_tutorial.pk, user='bff535b2-23d0-4bd5-9675-bd8e604fe5f2')
    
    def test_attendance_list_viewset(self):
        #force setup
        self.set_up()
        
        response= client.get(
            reverse('attendees-list', kwargs={'event_pk':self.asd_tutorial.pk})
            )
        #get db data
        attendance = Attendance.objects.all()
        serializer = AttendanceSerializer(attendance, many=True)
        
        # test that data matches and was not empty
        data = response.data.pop('results')
        self.assertEqual(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_attendance_retrive_viewset(self):
        #force setup
        self.set_up()
        
        response = client.get(
                reverse('attendees-detail', kwargs={'event_pk':self.asd_tutorial.pk, 'pk':self.valid_payload})
            )
        #get db data to test
        attendance = Attendance.objects.get(event=self.asd_tutorial.pk, user=self.valid_payload)
        serializer = AttendanceSerializer(attendance)
        # test that get event exists and matches db 
        data = response.data
        self.assertEqual(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_valid_attendance_create_viewset(self):
        #force setup
        self.set_up()
        response = client.post(
                reverse('attendees-list', kwargs={'event_pk':self.asd_tutorial.pk}),
                data={'event':self.asd_tutorial.pk, 'user':self.valid_payload},
                content_type='application/json'
            )
        #test that creation succeeds
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
    def test_invalid_attendance_create_viewset(self):
        #force setup
        self.set_up()
        response = client.post(
                reverse('attendees-list', kwargs={'event_pk':self.asd_tutorial.pk }),
                data={'event':self.asd_tutorial.pk, 'user':self.invalid_payload},
                content_type='application/json'
            )
        #test that creation fails
        assert(not Attendance.objects.filter(event=self.asd_tutorial.pk, user=self.invalid_payload).exists())
        #self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_valid_attendance_delete_viewset(self):
        #force setup
        self.set_up()
        response = client.delete(
                reverse('attendees-detail', kwargs={'event_pk':self.asd_tutorial.pk, 'pk':self.valid_payload})
            )
        #test that deletion fails
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_invalid_attendance_delete_viewset(self):
        #force setup
        self.set_up()
        response = client.delete(
                reverse('attendees-detail', kwargs={'event_pk':self.asd_tutorial.pk, 'pk':self.invalid_payload})
            )
        #test that deletion fails
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
