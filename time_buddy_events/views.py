#from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event
from .serializers import Event_Serializer
# Create your views here.


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