# Generated by Django 4.1 on 2022-10-23 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('time_buddy_groups', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='organisation',
            old_name='organisation_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='organisation',
            old_name='group_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='organisation',
            old_name='group_password',
            new_name='password',
        ),
        migrations.AddField(
            model_name='organisation',
            name='address',
            field=models.CharField(default='red', max_length=31, unique=True),
            preserve_default=False,
        ),
    ]
