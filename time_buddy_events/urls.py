from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='home'),
    path('create/', views.add_events, name='add-events'),
    path('all/', views.view_events, name='view_events'),
    path('update/<uuid:pk>/', views.update_events, name='update-events'),
    path('event/<uuid:pk>/delete',views.delete_events, name='delete-events'),
]
