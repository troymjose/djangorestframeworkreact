from rest_framework import serializers
from .models import Product, Category


class ProductCategorySerializer(serializers.ModelSerializer):
    '''
    Serializer class to convert the model query sets to json format
    type: ModelSerializer
    model: Category
    fields: id, name
    '''
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    '''
    Serializer class to convert the model query sets to json format
    type: ModelSerializer
    model: Product
    fields: id, name, desc, category, units
    '''
    class Meta:
        model = Product
        fields = "__all__"

    def to_representation(self, instance):
        '''
        This is to override the default id value to name of <category> column 
        '''
        rep = super().to_representation(instance)
        rep['category'] = ProductCategorySerializer(
            instance.category).data["name"]
        return rep
