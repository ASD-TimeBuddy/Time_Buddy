import json
import os
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Event, Time_Zone
from ..serializers import EventSerializer

class Test_CRUD_Events(TestCase):
    #path = r"D:/Current/AdvSoftwareDev/Time_Buddy/time_buddy_events/test_objs/event.json"
    # setup event for testing
    path = r"./time_buddy_events/test_objs/event.json"
    assert os.path.exists(path)
    json_file = open(path, "r")
    obj =json.load(json_file)
    
    def set_up(self):
        # create any Events needed for tests
        Time_Zone(tz_name="AEST").save()
        record = Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"], dt_start=self.obj["dt_start"], dt_end=self.obj["dt_end"])
        record.save()
        
    def test_create_event(self):
        #count the number of events
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        pre_count = query.count()
        
        #Create a new event
        self.set_up()
        
        #Check that a new event was added
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        self.assertEqual(query.count(),pre_count + 1)
    
    def test_read_event(self):
        #setup event
            #Time_Zone(tz_name="AEST").save()
            #Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        #retrive a single entry
        self.set_up()
        query = Event.objects.get(summary__contains=self.obj["summary"])
        self.assertEqual(query.summary, self.obj["summary"])
