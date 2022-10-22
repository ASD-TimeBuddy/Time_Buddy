from django.urls import include, path
from rest_framework import routers
from . import views
from .views import AttendanceViewSet, UserViewSet

urlpatterns = [
    path('overview', views.api_overview, name='home'),
    path('', views.get_post_events, name='get_post_events'),
    path('<uuid:pk>/', views.get_delete_update_event, name='get_delete_update_event'),
    path('<uuid:pk>/Attendance/', include('rest_framework.urls', namespace='rest_framework', name='get_post_atentance '))
]
