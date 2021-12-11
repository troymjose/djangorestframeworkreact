from django.urls import path, include
from .routers import router
from .views import CategoryListAPIView


app_name = "products"
urlpatterns = [
    path('category/', CategoryListAPIView.as_view(), name='category'),
    path('', include(router.urls)),
]
