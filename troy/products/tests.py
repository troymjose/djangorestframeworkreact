from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import Product, Category
from collections import namedtuple


class ProductsAPITestCase(APITestCase):
    def setUp(self):
        username, email, password = 'test_user', 'test_user@quality.com', 'Pass@123'

        # Create test user
        test_user = User.objects.create_user(
            username=username, email=email, password=password)
        test_user.is_active = True
        test_user.save()

        # Obtain the JWT Access Token
        url = reverse('token_obtain_pair')
        resp = self.client.post(
            url, {'username': username, 'password': password}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue('refresh' in resp.data)
        self.assertTrue('access' in resp.data)

        token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        # Create a category
        category_name = "test_plane"
        self.category = Category(1, category_name)
        self.category.save()

        # Create n products
        n = 2
        ProductsNT = namedtuple(
            "Product", ['id', 'name', 'desc', 'category', 'units'])
        self.products = []
        for index in range(1, n+1):
            self.products.append(ProductsNT(
                index, f"test_p00{index}", f"version 00{index}", self.category.id, index))

        for index in range(len(self.products)):
            product = Product(self.products[index].id, self.products[index].name,
                              self.products[index].desc, self.products[index].category, self.products[index].units)
            product.save()

    def test_setUp(self):
        # print(self.token)
        # url = reverse('token_obtain_pair')
        # print(url)
        # url = reverse('token_refresh')
        # print(url)
        # url = reverse('products:category')
        # print(url)
        # url = reverse('products:products-list')
        # print(url)
        # url = reverse('products:products-detail', kwargs={'pk': 1})
        # print(url)
        # url = reverse('schema-swagger-ui')
        # print(url)
        # url = reverse('schema-redoc')
        # print(url)
        pass

    def test_products_list_positive(self):
        '''
        Desc: Test whethere api to list all the products is working
        '''
        # Call the products list api
        url = reverse('products:products-list')
        resp = self.client.get(
            url, {}, format='json')

        # Check the high level schema
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 2)
        self.assertEqual(len(resp.data[0].keys()), 5)

        # Check the data correctness
        for index in range(len(self.products)):
            self.assertEqual(resp.data[index]['id'], self.products[index].id)
            self.assertEqual(resp.data[index]['name'],
                             self.products[index].name)
            self.assertEqual(resp.data[index]['desc'],
                             self.products[index].desc)
            self.assertEqual(resp.data[index]['category'], self.category.name)
            self.assertEqual(resp.data[index]['units'],
                             self.products[index].units)

    def test_products_list_query_positive(self):
        '''
        Desc: Test whethere api to list all the products is working while providing query parameter
        '''
        # Call the products list api with query parameter
        url = reverse('products:products-list')
        resp = self.client.get(
            url, {'category':f'{self.category.name}'}, format='json')

        # Check the high level schema
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 2)

        # Check the data correctness
        for index in range(len(self.products)):
            self.assertEqual(resp.data[index]['category'], self.category.name)

        # Create a category
        category_name = "test_helipad"
        new_category = Category(2, category_name)
        new_category.save()
        product = Product(200, 'helipad001','version 001', 2, 397)
        product.save()

        resp = self.client.get(
            url, {'category':f'{new_category.name}'}, format='json')

        # Check the high level schema
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 1)

        # Check the data correctness
        for index in range(len(resp.data)):
            self.assertEqual(resp.data[index]['category'], new_category.name)