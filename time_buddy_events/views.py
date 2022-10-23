from argparse import Action
from ast import Try
from codecs import lookup
import queue
from urllib import response
from webbrowser import get
from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import routers, serializers, viewsets, status
#https://auth0.com/docs/quickstart/webapp/django/01-login
#from django.contrib.auth.models import User

from rest_framework import status
from rest_framework import filters
from rest_framework import generics
from .models import Event, User, Attendance
from .serializers import AttendanceSerializer, EventSerializer, UserSerializer
# Create your views here.
# based on https://www.geeksforgeeks.org/django-rest-api-crud-with-drf/


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class AttendeesViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = AttendanceSerializer
    
    def list(self, request, event_pk=None):
        event = self.queryset.filter(event_id=event_pk).values_list('attendees')
        attendees = User.objects.filter(pk__in=event)
        serializer = UserSerializer(attendees, many=True)
        return Response(serializer.data)
    
    def retrive(self, request, pk=None, event_pk=None):
        attendees = self.queryset.get(pk=pk, event_id=event_pk)
        serializer = UserSerializer(attendees, many=False)
        return Response(serializer.data)
    
    # need to update for multiple invitees in future
    def create(self, request, event_pk):
        data = {
            'event':request.data.get('event'),
            'user':request.data.get('user')
        }
        serializer = AttendanceSerializer(data=data, many=False)
        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data)
        return Response(status.HTTP_400_BAD_REQUEST)
    
class AttendeeDeleteView(generics.DestroyAPIView):
    queryset = Attendance.objects.all()
    def destroy(self, request, event_pk,pk):
        try:
            self.queryset.get(user=pk,event=event_pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except: 
            return Response(status=status.HTTP_400_BAD_REQUEST)
                
                