from django.shortcuts import render
from oauth2_provider.views.generic import ProtectedResourceView # ProtectedResourceMixin
from django.http import HttpResponse

class ApiEndpoint(ProtectedResourceView):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, OAuth2!')