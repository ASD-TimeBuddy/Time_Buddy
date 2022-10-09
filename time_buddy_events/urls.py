from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='home'),
<<<<<<< HEAD
    path('events/', views.add_events, name='add-events'),
    path('events/', views.view_events, name='view_events'),
    path('event/<uuid:pk>/', views.update_events, name='update-events'),
    path('event/<uuid:pk>/',views.delete_events, name='delete-events'),
=======
    path('events/', views.view_events, name='view_events'),
    path('events/', views.add_events, name='add-events'),
    path('events/<uuid:pk>', views.update_events, name='update-events'),
    path('events/<uuid:pk>',views.delete_events, name='delete-events'),
>>>>>>> d0f822445a9a16c110e4f484800e0dd98fdf1194
]
