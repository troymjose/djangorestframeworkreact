from rest_framework import routers
from .views import ProductsModelViewSet


router = routers.SimpleRouter()
router.register('', ProductsModelViewSet, basename='products')
