import json
import os
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from .models import Event, Time_Zone
from .serializers import Event_Serializer


# initialize the APIClient app
client = Client()

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

    def test_update_event(self):
        #setup event
            #Time_Zone(tz_name="AEST").save()
            #Event(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"]).save()
        self.set_up()
        
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
        self.set_up()
        
        #check that setup was successful
        self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),1)
        
        #begin test
        record = Event.objects.get(summary__contains=self.obj["summary"])
        record.delete()
        
        #Check that event was deleted
        self.assertRaises(Event.DoesNotExist, Event.objects.get, summary__contains=self.obj["summary"])
        #Event.objects.get(summary__contains=self.obj["summary"])
        #self.assertEqual(Event.objects.filter(summary__contains=self.obj["summary"]).count(),0)

class Test_GET_API_Events(TestCase):
    """ Test module for GET single event API """
    path = r"./time_buddy_events/test_objs/event.json"
    assert os.path.exists(path)
    json_file = open(path, "r")
    obj =json.load(json_file)

    def set_up(self):
        # create any Events needed for tests
        self.tz = Time_Zone(tz_name="AEST").save()
        self.record1 = Event.objects.create(location=self.obj["location"],summary=self.obj["summary"],description=self.obj["description"])
        self.record2 = Event.objects.create(location='office', summary='fake', description='test desc')
        
    def test_get_all_events(self):
        # get API response
        response = client.get(reverse('get_post_events'))
        # get data from db
        events = Event.objects.all()
        serializer = Event_Serializer(events, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_valid_single_event(self):
        #force setup
        self.set_up()
        
        #get API response
        response = client.get(
            #get primary key of test event from setup
            reverse('get_delete_update_event', kwargs={'pk':self.record2.pk}))
        event = Event.objects.get(pk=self.record2.pk)
        serializer = Event_Serializer(event)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_invalid_single_event(self):
        #force setup
        self.set_up()

        # get API response
        response = client.get(
            reverse('get_delete_update_event', kwargs={'pk':'fe173cd1-9c8e-440b-bd72-6b4ebd7fcdcb'}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    

class Test_POST_API_Events(TestCase):
    """ Test module for GET single event API """
    path = r"./time_buddy_events/test_objs/event.json"
    assert os.path.exists(path)
    json_file = open(path, "r")
    obj =json.load(json_file)

    def set_up(self):
        self.tz = Time_Zone(tz_name="AEST").save()
        self.valid_payload = self.obj
        self.invalid_payload = {
            'summary':'',
            'location':'',
            'description':''
        }

    def test_create_valid_event(self):
        #force setup
        self.set_up()

        response = client.post(
            reverse('get_post_events'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    #def test_create_invalid_event(self):