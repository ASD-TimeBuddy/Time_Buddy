from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework import routers, serializers, viewsets, status
#https://auth0.com/docs/quickstart/webapp/django/01-login
#from django.contrib.auth.models import User
from rest_framework import filters, generics, mixins, permissions, authentication
from django.db import transaction
from .models import Event, User, Attendance
from .serializers import AttendanceSerializer, EventSerializer, UserSerializer
# from oauth2_provider.views.generic import ProtectedResourceMixin
# from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasResourceScope
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as log_out
from urllib.parse import urlencode
from django.conf import settings
from django.http import HttpResponseRedirect


def index(request):
    user = request.user
    if user.is_authenticated:
        return redirect("/events")
    else:
        return render(request, {"you must get authenticated"})
    
def logout(request):
    log_out(request)
    return_to = urlencode({"returnTo": request.build_absolute_uri("/")})
    logout_url = "https://{}/v2/logout?client_id={}&{}".format(
        settings.SOCIAL_AUTH_AUTH0_DOMAIN, settings.SOCIAL_AUTH_AUTH0_KEY, return_to,
    )
    return HttpResponseRedirect(logout_url)


# based on https://www.geeksforgeeks.org/django-rest-api-crud-with-drf/
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #authentication_classes = [authentication.SessionAuthentication] #don't use
    permission_classes = []

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    
    #permission_classes = [permissions.isStaffEditorPermission]
#ProtectedResourceMixin, 
class AttendeesViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [
        permissions.IsAdminUser, 
        permissions.IsAuthenticated, 
    ]
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
                
                