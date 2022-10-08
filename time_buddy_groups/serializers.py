from django.db.models import fields
from rest_framework import serializers
from .models import Group

class Group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('group_id','description')