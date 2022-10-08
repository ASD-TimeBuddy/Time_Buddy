from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='home'),
    path('create/', views.add_groups, name='add-groups'),
    path('all/', views.view_groups, name='view_groups'),
    path('event/<uuid:pk>/delete',views.delete_groups, name='delete-groups'),
]
