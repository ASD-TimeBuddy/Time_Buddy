from django.test import TestCase
from .models import Event, Time_Zone
import json
import os

# Create your tests here.
class Test_environment(TestCase):
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

    def test_create_event(self):
        #create event
        Time_Zone(tz_name="AEST").save()
        record = Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"])
        
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        pre_count = query.count()

        record.save()
        query = Event.objects.filter(summary__contains=self.obj["summary"])
        self.assertEqual(query.count(),pre_count + 1)
    
    def test_read_event(self):
        #setup event
        Time_Zone(tz_name="AEST").save()
        Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        #retrive a single entry
        query = Event.objects.get(summary__contains=self.obj["summary"])
        self.assertEqual(query.summary, self.obj["summary"])

    def test_update_event(self):
        #setup event
        Time_Zone(tz_name="AEST").save()
        Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        #begin test
        old_loc = self.obj["location"]
        new_loc = 'UTS Library'
        record = Event.objects.get(summary__contains=self.obj["summary"])
        pre_change = record.location
        self.assertEqual(pre_change, old_loc)
        record.location = new_loc
        record.save()
        post_change = Event.objects.get(summary__contains=self.obj["summary"]).location
        self.assertEqual(post_change,new_loc)

    def test_delete_event(self):
        #setup event
        Time_Zone(tz_name="AEST").save()
        Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),1)
        #begin test
        

        record = Event.objects.get(summary__contains=self.obj["summary"])
        record.delete()
        self.assertRaises(Event.DoesNotExist, Event.objects.get, summary__contains=self.obj["summary"])
        #Event.objects.get(summary__contains=self.obj["summary"])
        #self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),0)


