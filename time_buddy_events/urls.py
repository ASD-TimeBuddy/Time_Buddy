from django.urls import path
from . import views

urlpatterns = [
    path('overview', views.api_overview, name='home'),
    path('', views.get_post_events, name='get_post_events'),
    path('<uuid:pk>/', views.get_delete_update_event, name='get_delete_update_event'),
]
