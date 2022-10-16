from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from .models import Event
from .serializers import Event_Serializer
# Create your views here.
# based on https://www.geeksforgeeks.org/django-rest-api-crud-with-drf/


# for info on decorators see - https://stackoverflow.com/questions/6392739/what-does-the-at-symbol-do-in-python
# @api_view passes the decorated fuction as an argument in the api_view function
@api_view(['GET'])
def api_overview(request): #pass in html request
    api_urls = {
        'all_events': '/',
        #to fill out
    }

    return Response(api_urls)

@api_view(['GET', 'DELETE', 'PUT'])
def get_delete_update_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # get single event
    if request.method == 'GET':
        serializer = Event_Serializer(event)
        return Response(serializer.data)
    # delete a single event
    elif request.method == 'DELETE':
        return Response({})
    elif request.method == 'PUT':
        return Response({})

@api_view(['GET', 'POST'])
def get_post_events(request):
    # get all events
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = Event_Serializer(events, many=True)
        return Response(serializer.data)
    # insert a new event
    elif request.method == 'POST':
        data = {
            'summary': request.data.get('summary'),
            'location': request.data.get('location'),
            'description': request.data.get('description')
        }
        
        #validate request using serializer, then save
        serializer = Event_Serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)