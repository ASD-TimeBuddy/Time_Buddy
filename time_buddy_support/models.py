from django.db import models

class QuestionAnswer(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField
