from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from .models import Organisation
from .serializers import OrganisationSerializer

#get view
class OrganisationViewSet(viewsets.ModelViewSet):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return super(OrganisationViewSet,self).get_queryset()
    
    def list(self, request, *args, **kwargs):
        query_set = self.get_queryset()
        data = OrganisationSerializer(query_set, many=True).data
        return Response(data={'error': False, 'message':None, 'results':data})
    
    def create(self, request, *args, **kwargs):
        query_set = self.getqueryset()
        request_data = request.data
        org, created = Organisation.objects.get_or_create(
            #organisation_id, 
            group_name = request_data['group_name'],
            #group_password = request_data['group_password'] # to be replaced w/ propper handling
        )
        data = OrganisationSerializer(org).data
        return Response(data={'error': False, 'message': "Organisation successfully created", 'results': data})