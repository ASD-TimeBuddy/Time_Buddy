from rest_framework import serializers

from .models import Organisation

class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ('organisation_id', 'group_name', 'group_password')
