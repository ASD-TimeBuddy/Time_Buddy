from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from .models import Organisation
from .serializers import OrganisationSerializer

class OrganisationViewSet(viewsets.ModelViewSet):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]