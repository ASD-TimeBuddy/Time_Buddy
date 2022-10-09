from django.test import TestCase, Client
from django.urls import reverse
from .models import Event, Time_Zone
from .serializers import Event_Serializer
import json
import os

# Create your tests here.
class Test_environment(TestCase):
    client = Client()
    
    
    def test_assert(self):
        """CI pipleline setup test"""
        self.assertEqual(1,1)

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
        record = Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"])
        record.save()
        
    def test_create_event(self):
        #count the number of events
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        pre_count = query.count()
        
        #Create a new event
        
        
        #Check that a new event was added
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        self.assertEqual(query.count(),pre_count + 1)
    
    def test_read_event(self):
        #setup event
            #Time_Zone(tz_name="AEST").save()
            #Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        #retrive a single entry
        query = Event.objects.get(summary__contains=self.obj["summary"])
        self.assertEqual(query.summary, self.obj["summary"])

    def test_update_event(self):
        #setup event
            #Time_Zone(tz_name="AEST").save()
            #Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
       
        #begin test
        old_loc = self.obj["location"]
        new_loc = 'UTS Library'
        
        #check that location hasn't already been updated
        record = Event.objects.get(summary__contains=self.obj["summary"])
        self.assertEqual(record.location, old_loc)
       
        #Update the record
        record.location = new_loc
        record.save()
       
        #check that the update was successful
        post_change = Event.objects.get(summary__contains=self.obj["summary"]).location
        self.assertEqual(post_change,new_loc)

    def test_delete_event(self):
        #setup event
            #Time_Zone(tz_name="AEST").save()
            #Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        #check that setup was successful
        self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),1)
        
        #begin test
        record = Event.objects.get(summary__contains=self.obj["summary"])
        record.delete()
        
        #Check that event was deleted
        self.assertRaises(Event.DoesNotExist, Event.objects.get, summary__contains=self.obj["summary"])
        #Event.objects.get(summary__contains=self.obj["summary"])
        #self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),0)
