from django.contrib import admin
from django.urls import include, path
#from rest_framework import routers
from rest_framework_nested import routers
from . import views
from .views import EventViewSet, UserViewSet, AttendeesViewSet

router = routers.DefaultRouter()
router.register(r'users',UserViewSet, basename='users')
router.register(r'events',EventViewSet, basename='events')

attendance_router = routers.NestedSimpleRouter(router, r'events', lookup='event')
attendance_router.register(r'attendees', AttendeesViewSet, basename='attendees')
#attendance_router.register(r'attendees/<:attendeeID:>', AttendeeDeleteView)
# 'basename' is optional. Needed only if the same viewset is registered more than once
# Official DRF docs on this option: http://www.django-rest-framework.org/api-guide/routers/

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/public', views.public),
    path('api/private', views.private),
    path('api/private-scoped', views.private_scoped),
    path(r'', include(router.urls)),
    path(r'', include(attendance_router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
