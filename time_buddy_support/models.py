from django.db import models

# Should have a uuid, but didn't for certain reasons
class QuestionAnswer(models.Model):
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=512)
