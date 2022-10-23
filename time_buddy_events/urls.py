from django.urls import include, path
from rest_framework import routers
from . import views
from .views import EventViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'users',UserViewSet)
router.register(r'events',EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
