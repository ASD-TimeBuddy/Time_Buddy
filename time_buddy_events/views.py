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
        'Search by User': '/?user=user_name',
        'Search by Summary': '/?summary=summary_text',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/event/pk/delete'
    }

    return Response(api_urls)

# add events using only : 'location','summary','description'
#@api_view(['POST'])
#def add_events(request):
#    event = Event_Serializer(data=request.data)

    # validating for already existing data
#    if Event.objects.filter(**request.data).exists():
#        raise serializers.ValidationError('This data already exists')
    
#    if event.is_valid():
#        event.save()
#        return Response(event.data)
#    else:
#        return Response(status=status.HTTP_404_NOT_FOUND)

#@api_view(['GET'])
#def view_events(request):
#    #any decrypting or user ID should probably happen here#

#    #checking for the parameters from the URL 
#    if request.query_params:
#        #should clean query params before passing
#        events = Event.objects.filter(**request.query_params.dict())
#    else:
#        #delete <>
#        events = Event.objects.all()

    #return any events found, else 404 not found.
#    if events:
        #force multiple values in serializer, else API can't find fields
#        serializer = Event_Serializer(events, many=True)
#        return Response(serializer.data)
#    else:
#        return Response(status=status.HTTP_404_NOT_FOUND)

api_view(['GET','POST'])
def view_events(request):
    if request.method = 'GET':
        #any decrypting or user ID should probably happen here

        #checking for the parameters from the URL 
        if request.query_params:
            #should clean query params before passing
            events = Event.objects.filter(**request.query_params.dict())
        else:
            #delete <>
            events = Event.objects.all()

        #return any events found, else 404 not found.
        if events:
            #force multiple values in serializer, else API can't find fields
            serializer = Event_Serializer(events, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else if request.method = 'POST':
        event = Event_Serializer(data=request.data)

         validating for already existing data
        if Event.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')
        
        if event.is_valid():
            event.save()
            return Response(event.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:


@api_view(['POST'])
def update_events(request, pk):
    #retrive related entry from model
    event = Event.objects.get(pk=pk)
    data = Event_Serializer(instance=event, data=request.data)

    #if input data is valid, update record and return new data.
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_events(request, pk):
    event = get_object_or_404(Event, pk=pk)
    event.delete()
    return Response(status=status.HTTP_202_ACCEPTED)
