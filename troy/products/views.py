from django.db.models.query import QuerySet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from .serializers import ProductSerializer, ProductCategorySerializer
from .models import Product, Category
from rest_framework.response import Response
from rest_framework import status


class CategoryListAPIView(ListAPIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = ProductCategorySerializer


class ProductsModelViewSet(ModelViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Get the list of items for this view.
        This must be an iterable, and may be a queryset.
        Defaults to using `self.queryset`.

        This method should always be used rather than accessing `self.queryset`
        directly, as `self.queryset` gets evaluated only once, and those results
        are cached for all subsequent requests.

        You may want to override this if you need to provide different
        querysets depending on the incoming request.

        (Eg. return a list of items that is specific to the user)
        """
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            if not self.request.query_params:
                queryset = queryset.all()
            else:
                category = self.request.query_params.get('category', None)
                queryset = None if category is None else queryset.all().filter(
                    category__name__iexact=category)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # Check if queryset is None. if Yes, raise 400
        if queryset is None:
            context = {'error': "Invalid key for query parameter",
                       'message': 'Provide <category> as the key for query parameter'}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
