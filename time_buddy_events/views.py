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
from django.db import transaction
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
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    
    # def list(self, request, event_pk=None):
    #     event = self.queryset.filter(event_id=event_pk)
    #     attendees = Attendance.objects.filter(event__in=event)
    #     serializer = AttendanceSerializer(attendees, many=True)
        
    #     return Response(serializer.data) 
    
    # redefine retreive to search on event & user instead of hidden PK
    def retrieve(self, request, pk=None, event_pk=None):
        attendees = self.queryset.get(user=pk, event_id=event_pk)
        serializer = AttendanceSerializer(attendees, many=False)
        return Response(serializer.data)
    
    #need to update for multiple invitees in future
    #@transaction.atomic
    def create(self, request, event_pk):
        data = {
            'event':request.POST.get('event'),
            'user':request.POST.get('user')
            #'event':event_pk,
            #'user':pk
        }
        serializer = AttendanceSerializer(data=data, many=False)
        user = User(data.pop('user'))
        try: 
            User.objects.get(user)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return Response(serializer.data)
        return Response(status.HTTP_400_BAD_REQUEST)
        
            
    def destroy(self, request, event_pk, pk):
        try:
            self.queryset.get(event=event_pk,user=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except: 
            return Response(status=status.HTTP_400_BAD_REQUEST)
                
                