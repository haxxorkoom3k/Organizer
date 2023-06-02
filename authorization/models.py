from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    
    if created:
        Token.objects.create(user = instance)


class Tags(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.owner} - {self.title}"

class Notes(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_pinned = models.BooleanField(default=False)
    title = models.CharField(max_length=50, null=True, blank=True)
    body = models.TextField(blank=True, null=True)
    tag = models.CharField(max_length=20, blank=True, null=True)
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner} - {self.title}"
    
class ToDo(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    tag = models.CharField(max_length=20, blank=True, null=True)
    completed = models.CharField(max_length=15, null=True, blank=True, default='Нет')
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.owner} - {self.title}'
    
class ToDo_tags(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.owner} - {self.title}'
    
class Spend(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    tag = models.CharField(max_length=15, blank=True, null=True)
    date = models.DateField(auto_now=True)
    update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.owner} - {self.title}'
    
class SpendTags(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.owner} - {self.title}'
