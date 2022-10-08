from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from .models import Group
from .serializers import Group_Serializer
# Create your views here.
# based on https://www.geeksforgeeks.org/django-rest-api-crud-with-drf/


# for info on decorators see - https://stackoverflow.com/questions/6392739/what-does-the-at-symbol-do-in-python
# @api_view passes the decorated fuction as an argument in the api_view function
@api_view(['GET'])
def api_overview(request): #pass in html request
    api_urls = {
        'all_groups': '/',
        'Search by Organisation': '/?organisation=organisation_name',
        'Add': '/create',
        'Delete': '/event/pk/delete'
    }

    return Response(api_urls)

# add groups using only description: 
@api_view(['POST'])
def add_groups(request):
    group = Group_Serializer(data=request.data)

    # validating for already existing data
    if Group.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
    
    if group.is_valid():
        group.save()
        return Response(group.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def view_groups(request):
    #any decrypting or organisation ID should probably happen here

    #checking for the parameters from the URL 
    if request.query_params:
        #should clean query params before passing
        groups = Group.objects.filter(**request.query_params.dict())
    else:
        #delete <>
        groups = Group.objects.all()

    #return any groups found, else 404 not found.
    if groups:
        #force multiple values in serializer, else API can't find fields
        serializer = Group_Serializer(groups, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_groups(request, pk):
    group = get_object_or_404(Group, pk=pk)
    group.delete()
    return Response(status=status.HTTP_202_ACCEPTED)