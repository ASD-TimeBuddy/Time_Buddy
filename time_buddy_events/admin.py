from django.contrib import admin

from .models import Event, User, Attendance

# Register your models here.
admin.site.register(Event)
admin.site.register(User)
admin.site.register(Attendance)