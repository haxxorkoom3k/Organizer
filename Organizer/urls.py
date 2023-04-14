"""Organizer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from authorization import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register', views.RegistrationAPI.as_view(), name='user_create'),
    path('api/user/login', views.user, name='user'),
    path('api/user', views.UserAPI.as_view(), name='LoginData'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/notes/<int:pk>', views.getNote, name='note'),
    path('api/note', views.getNotesList, name='notes-list'),
    path('api/note-create', views.noteCreateAPI.as_view(), name='create-note'),
    path('api/new-tag', views.tagsCreateAPI.as_view(), name='create-tag'),
    path('api/get-taglist', views.getUserTags, name='user-tags-list'),
    path('api/delete-note/<int:pk>', views.noteDeleteAPI.as_view(), name='delete-note'),
    path('api/new-todo', views.ToDoCreateAPI.as_view(), name='new-todo'),
    path('api/get-todolist', views.getUserToDo, name='user-todo-list'),
    path('api/get-todotags', views.getToDoChoice, name='todo-tags'),
    path('api/delete-todo/<int:pk>', views.DeleteUserToDo.as_view(), name='delete-todo'),
]
