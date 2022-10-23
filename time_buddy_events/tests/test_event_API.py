import json
import os
from urllib import response
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
#from djangolcontrib.auth import get_user_model
#from rest_framework_simplejqt.tokens import RefreshToken
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Event, Time_Zone
from ..serializers import EventSerializer

# initialize the APIClient app
client = Client()

# Create your tests here.
class Test_environment(TestCase):
    
    def test_assert(self):
        """CI pipleline setup test"""
        self.assertEqual(1,1)

# for help on determining reverse name: http://www.tomchristie.com/rest-framework-2-docs/api-guide/routers
class Test_GET_API_Events(TestCase):
    """ Test module for GET single event API """
    path = r"./time_buddy_events/test_objs/event.json"
    assert os.path.exists(path)
    json_file = open(path, "r")
    obj =json.load(json_file)

    def set_up(self):
        # create any Events needed for tests
        self.tz = Time_Zone(tz_name="AEST").save()
        self.record1 = Event.objects.create(location=self.obj["location"], summary=self.obj["summary"], description=self.obj["description"], dt_start=self.obj["dt_start"], dt_end=self.obj["dt_end"])
        self.record2 = Event.objects.create(location='office', summary='fake', description='test desc', dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00") 
        
    def test_get_all_events(self):
        self.set_up()
        response= client.get(reverse('events-list'))
        #get db data
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        
        # test that data matches and was not empty
        data = response.data.pop('results')
        self.assertEqual(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_one_event(self):
        self.set_up()
        response = client.get(
                reverse('events-detail', kwargs={'pk':self.record2.pk})
            )
        
        #get db data to test
        event = Event.objects.get(pk=self.record2.pk)
        serializer = EventSerializer(event)
        # test that get event exists and matches db 
        data = response.data
        self.assertEqual(data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    