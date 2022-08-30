from django.test import TestCase
import json
import os

# Create your tests here.
class Test_Tests(TestCase):
    def test_model(self):
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
        """Event Creation Test"""
        
