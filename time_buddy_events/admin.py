from django.contrib import admin

from .models import Event_Attendance,User

# Register your models here.
admin.site.register(Event_Attendance)
admin.site.register(User)