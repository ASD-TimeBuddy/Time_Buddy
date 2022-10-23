from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/public', views.public),
    path('api/private', views.private),
    path('api/private-scoped', views.private_scoped),
    path('', views.api_overview, name='home'),
    path('create/', views.add_events, name='add-events'),
    path('all/', views.view_events, name='view_events'),
    path('update/<uuid:pk>/', views.update_events, name='update-events'),
    path('event/<uuid:pk>/delete',views.delete_events, name='delete-events'),
]
