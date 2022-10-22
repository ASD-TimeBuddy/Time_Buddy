import json
import os
from rest_framework import status
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
        # get API response
        response = client.get(reverse('get_post_events'))
        # get data from db
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
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
        serializer = EventSerializer(event)
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
    """ Test module for POST valid and invalid events API """
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

        #get response from posting valid payload
        response = client.post(
            reverse('get_post_events'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        # test that creation succeeds 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
    def test_create_invalid_event(self):
        #force setup
        self.set_up()
        
        #get response from posting invalid payload
        response = client.post(
            reverse('get_post_events'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        # test that creation fails
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        
class Test_PUT_API_Events(TestCase):
    """ Test module for updating an existing event record"""
    path = r"./time_buddy_events/test_objs/event.json"
    assert os.path.exists(path)
    json_file = open(path, "r")
    obj =json.load(json_file)

    def set_up(self):
        self.tz = Time_Zone(tz_name="AEST").save()
        self.asd_tutorial = Event.objects.create(summary='ASD Tutoral', location='UTS b02', description="this is NOT a test description", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
        self.id_tutorial = Event.objects.create(summary='Interaction Design Tutorial', location='UTS b11', description="UTS b11", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
        self.valid_payload = self.obj
        self.invalid_payload = {
            'summary':'',
            'location':'something else I guess?',
            'description':''
        }
    
    def test_valid_update_event(self):
        #force setup
        self.set_up()
        
        #get response from putting valid payload
        response= client.put(
            reverse('get_delete_update_event', kwargs={'pk':self.asd_tutorial.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        # test that update succeeds 
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_invalid_update_event(self):
        #force setup
        self.set_up()
        
        #get response from putting invalid payload
        response= client.put(
            reverse('get_delete_update_event', kwargs={'pk':self.id_tutorial.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        # test that update fails 
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
class Test_DELETE_API_Events(TestCase):
    """ Test module for updating an existing event record"""
    #path = r"./time_buddy_events/test_objs/event.json"
    #assert os.path.exists(path)
    #json_file = open(path, "r")
    #obj =json.load(json_file)

    def set_up(self):
        self.tz = Time_Zone(tz_name="AEST").save()
        self.asd_tutorial = Event.objects.create(summary='ASD Tutoral', location='UTS b02', description="this is NOT a test description", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
        self.id_tutorial = Event.objects.create(summary='Interaction Design Tutorial', location='UTS b11', description="UTS b11", dt_start="1970-01-01 00:00:00", dt_end="1970-01-01 01:00:00")
    
    def test_valid_delete_event(self):
        #force setup
        self.set_up()
        
        #get response from deleting valid payload
        response= client.delete(
            reverse('get_delete_update_event', kwargs={'pk':self.asd_tutorial.pk})
        )
        # test that update succeeds 
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_invalid_delete_event(self):
        #force setup
        self.set_up()
        
        #get response from deleting invalid payload
        response= client.delete(
            reverse('get_delete_update_event', kwargs={'pk':'0cbc2b45-8067-44e5-ba48-b9b10c72f206'})
        )
        # test that update fails 
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)