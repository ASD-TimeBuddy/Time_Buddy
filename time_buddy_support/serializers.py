from rest_framework import serializers

from .models import QuestionAnswer

class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = ('id', 'question', 'answer')
