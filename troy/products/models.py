from django.db import models
from django.db.models.base import Model


class Category(models.Model):
    '''
    Model class for Product Category table
    Primary key: id
    Other Fields: name,
    '''
    id = models.AutoField(primary_key=True, verbose_name="Category Id")
    name = models.CharField(verbose_name="Category Name",
                            max_length=255, null=False, blank=False)

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"Category('{self.name}')"


class Product(models.Model):
    '''
    Model class for Product table
    Primary Key: id
    Other Fields: name, desc, category, units
    '''
    id = models.AutoField(primary_key=True, verbose_name="Product Id")
    name = models.CharField(verbose_name="Product Name",
                            max_length=255, null=False, blank=False)
    desc = models.TextField(
        verbose_name="Product Description", null=False, blank=False)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, verbose_name="Product Category")
    units = models.PositiveIntegerField(
        verbose_name="Product Units", default=0)

    def __str__(self):
        return self.name

    def __repr__(self):
        return f"Product('{self.name}', '{self.desc}', '{self.category}', {self.units})"

    def __len__(self):
        return self.units
