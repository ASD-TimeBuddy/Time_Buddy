# Generated by Django 4.1 on 2022-08-31 01:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('time_buddy_events', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='tz_id',
            new_name='tz',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='user_id',
            new_name='user',
        ),
    ]
