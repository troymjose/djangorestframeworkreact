from django.db.models.query import QuerySet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.serializers import Serializer
from .serializers import ProductSerializer, ProductCategorySerializer
from .models import Product, Category
from rest_framework.response import Response
from rest_framework import status


class ProductsModelViewSet(ModelViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
