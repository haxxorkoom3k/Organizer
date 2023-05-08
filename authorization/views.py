from django.http import JsonResponse
from django.contrib.auth import logout
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from authorization.serializers import UserSerializer, CreateUserSerializer, NoteSerializer, TagsSerializer, ToDoSerializer, ToDoTagsSerializer, SpendSerializer, SpendTagsSerializer
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.db.models import Sum
from rest_framework.views import APIView
from .models import Notes, Tags, ToDo, ToDo_tags, Spend, SpendTags


class RegistrationAPI(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)

        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = True
            return Response(data, status=status.HTTP_200_OK)
        else:
            data = serializer.errors
            return Response(data)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })

@permission_classes([IsAuthenticated])
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
@api_view(['POST'])
def logout(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class noteCreateAPI(generics.CreateAPIView):
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class noteDeleteAPI(DestroyAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class tagsCreateAPI(generics.CreateAPIView):
    serializer_class = TagsSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getUserTags(request):
    tag = Tags.objects.all().filter(owner=request.user)
    serializer = TagsSerializer(tag, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class noteDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    queryset = Notes.objects.all()
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getNotesList(request):
    notes = Notes.objects.all().filter(owner=request.user).order_by('-update')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class DeleteUserNoteTag(DestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ToDoCreateAPI(generics.CreateAPIView):
    serializer_class = ToDoSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getUserToDo(request):
    todo = ToDo.objects.all().filter(owner=request.user).order_by('-update')
    serializer = ToDoSerializer(todo, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class getToDo(RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class toDoTagsCreateAPI(generics.CreateAPIView):
    serializer_class = ToDoTagsSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getUserToDoTags(request):
    tag = ToDo_tags.objects.all().filter(owner=request.user)
    serializer = ToDoTagsSerializer(tag, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class DeleteUserToDo(DestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class DeleteUserToDoTag(DestroyAPIView):
    queryset = ToDo_tags.objects.all()
    serializer_class = ToDoTagsSerializer

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class SpendCreateAPI(CreateAPIView):
    serializer_class = SpendSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class SpendUpdateDeleteAPI(RetrieveUpdateDestroyAPIView):
    serializer_class = SpendSerializer
    queryset = Spend.objects.all()
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def GetSpendList(request):
    spend = Spend.objects.all().filter(owner=request.user).order_by('-update')
    serializer = NoteSerializer(spend, many=True)
    return Response(serializer.data)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def GetUserSpend(request):
    spend = Spend.objects.all().filter(owner=request.user)
    serializer = SpendSerializer(spend, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class getUserSpendMoney(generics.ListAPIView):
    serializer_class = SpendSerializer
    
    def list(self, request):
        queryset = Spend.objects.all().filter(owner=request.user)
        total_spent = sum([a.amount for a in queryset])
        return Response({'total_spent': total_spent})
    
    

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class SpendTagsCreateAPI(CreateAPIView):
    serializer_class = SpendTagsSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class SpendTagsUpdateDeleteAPI(RetrieveUpdateDestroyAPIView):
    serializer_class = SpendTagsSerializer
    queryset = SpendTags.objects.all()
    lookup_field = 'pk'

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def GetSpendTagsList(request):
    spendtags = SpendTags.objects.all().filter(owner=request.user)
    serializer = SpendTagsSerializer(spendtags, many=True)
    return Response(serializer.data)

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def GetUserSpendTags(request):
    spendtags = SpendTags.objects.all().filter(owner=request.user)
    serializer = SpendSerializer(spendtags, many=True)
    return Response(serializer.data)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class DeleteUserSpendTag(DestroyAPIView):
    queryset = SpendTags.objects.all()
    serializer_class = SpendSerializer
