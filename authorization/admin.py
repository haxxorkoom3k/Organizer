from django.contrib import admin
from .models import Notes, Tags, ToDo, ToDo_tags
# Register your models here.

admin.site.register(Notes)
admin.site.register(Tags)
admin.site.register(ToDo)
admin.site.register(ToDo_tags)