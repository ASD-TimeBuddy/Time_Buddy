from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import routers, serializers, viewsets, status
#https://auth0.com/docs/quickstart/webapp/django/01-login
#from django.contrib.auth.models import User
from rest_framework import filters, generics, mixins, permissions, authentication
from django.db import transaction
from .models import Event, User, Attendance
from .serializers import AttendanceSerializer, EventSerializer, UserSerializer
from oauth2_provider.views.generic import ProtectedResourceMixin
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasResourceScope
#from .permissions import isStaffEditorPermission
# Create your views here.
# based on https://www.geeksforgeeks.org/django-rest-api-crud-with-drf/


# from authlib.integrations.django_oauth2 import ResourceProtector, BearerTokenValidator
# from django.http import JsonResponse
# #from time_buddy import validator

# require_auth = ResourceProtector()
# validator = validator.Auth0JWTBearerTokenValidator(
#     "dev-bszlo4b080fzjxrx.us.auth0.com",
#     "https://time-buddy-app-zqdu8.ondigitalocean.app"
# )
# require_auth.register_token_validator(validator)

# def public(request):
#     """No access token required to access this route
#     """
#     response = "Hello from a public endpoint! You don't need to be authenticated to see this."
#     return JsonResponse(dict(message=response))


# @require_auth(None)
# def private(request):
#     """A valid access token is required to access this route
#     """
#     response = "Hello from a private endpoint! You need to be authenticated to see this."
#     return JsonResponse(dict(message=response))


# @require_auth("read:events")
# def private_scoped(request):
#     """A valid access token and an appropriate scope are required to access this route
#     """
#     response = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
#     return JsonResponse(dict(message=response))

# need to create a custom permissions class for reading events ect. https://www.youtube.com/watch?v=c708Nf0cHrs
class UserViewSet(ProtectedResourceMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #authentication_classes = [authentication.SessionAuthentication] #don't use
    permission_classes = [TokenHasReadWriteScope, TokenHasResourceScope]
    
class EventViewSet(ProtectedResourceMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [TokenHasReadWriteScope, TokenHasResourceScope]
    
    
    #permission_classes = [permissions.isStaffEditorPermission]

class AttendeesViewSet(ProtectedResourceMixin, viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [TokenHasReadWriteScope, TokenHasResourceScope]
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
                
                