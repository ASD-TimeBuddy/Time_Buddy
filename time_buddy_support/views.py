from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions

from .models import QuestionAnswer
from .serializers import QuestionAnswerSerializer

class QuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = QuestionAnswer.objects.all()
    serializer_class = QuestionAnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
