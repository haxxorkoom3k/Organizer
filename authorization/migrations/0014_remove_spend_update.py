# Generated by Django 4.1.7 on 2023-06-02 23:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0013_alter_spend_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spend',
            name='update',
        ),
    ]
