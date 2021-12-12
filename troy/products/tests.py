from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

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
        self.token = resp.data['access']

    def test_setUp(self):
        print(self.token)
        url = reverse('token_obtain_pair')
        print(url)
        url = reverse('token_refresh')
        print(url)
        url = reverse('products:category')
        print(url)
        url = reverse('products:products-list')
        print(url)
        url = reverse('products:products-detail', kwargs={'pk': 1})
        print(url)
        url = reverse('schema-swagger-ui')
        print(url)
        url = reverse('schema-redoc')
        print(url)
