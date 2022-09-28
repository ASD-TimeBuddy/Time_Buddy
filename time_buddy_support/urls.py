from django.urls import include, path
from rest_framework import routers
from .views import QuestionAnswerViewSet


router = routers.DefaultRouter()
router.register(r'question-answer', QuestionAnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework'))
]
