from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='home')
]
