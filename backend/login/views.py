from django.shortcuts import render
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SuperUserSerializer
from rest_framework import permissions


# Create your views here.

class LoginView(APIView):
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = get_object_or_404(User, email=email)
        
        if not user.is_superuser:
            return Response({"error": 'You are not authorized to access this page'}, status=403)

        if user and user.is_superuser:
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': SuperUserSerializer(user).data
                })
            return Response({"error": 'Invalid credentials'}, status=400)
        return Response({"error": 'Only superusers can log in'}, status=400)
    

class UserDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"message": "Welcome, SuperUser!"})