""" models.py describes the models for our shopping cart app """
from django.db import models


class CartItem(models.Model):
    """ CartItem describes an Item that's been added to a cart """
    item = models.ForeignKey("shopping_cart_core.Item", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()


class Item(models.Model):
    """ Item describes a product for sale in our application """
    name = models.CharField(max_length=512)
    price = models.FloatField()
    description = models.TextField(blank=True)
    thumbnail_key = models.CharField(max_length=512)
