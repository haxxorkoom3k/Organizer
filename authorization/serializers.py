from rest_framework.serializers import ModelSerializer, Serializer, CharField
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from authorization.models import Notes
from rest_framework import request

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'date_joined']

        
class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','password']
 
    def save(self, *args, **kwargs):
        user = User(
            username=self.validated_data['username'],
            email = self.validated_data['email'],
        )
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user
    
    def userValidate(self, *args, **kwargs):
        if User.objects.filter(username=self.validated_data['username'].user).exists():
            raise serializers.ValidationError("Пользователь уже существует")
        


class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)


class NoteSerializer(ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), default=serializers.CurrentUserDefault())

    class Meta:
        model = Notes
        fields = ['pk', 'owner', 'title', 'body']
  