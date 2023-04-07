from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from authorization.serializers import UserSerializer, CreateUserSerializer, NoteSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from .models import Notes


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
    
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):
    if request.method == 'GET':
        notes = Notes.objects.get(owner=request.user, id=pk)
        serializer = NoteSerializer(notes, many=False)
        return Response(serializer.data)

    if request.method == 'PUT':
        data = request.data
        note = Notes.objects.get(owner=request.user, id=pk)
        serializer = NoteSerializer(instance=note, data=data)
    if request.method == 'DELETE':
        note = Notes.objects.get(owner=request.user, id=pk)
        note.delete()
        return Response('Заметка удалена')


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class noteCreateAPI(generics.CreateAPIView):
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    



def noteUpdate(request, pk):
    data = request.data
    note = Notes.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    
    return serializer.data

@renderer_classes((JSONRenderer))
@api_view(('GET',))
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def getNotesList(request):
    notes = Notes.objects.all().filter(owner=request.user).order_by('-update')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
