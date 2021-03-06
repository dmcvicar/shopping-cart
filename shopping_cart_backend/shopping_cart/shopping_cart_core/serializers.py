""" serializers.py describes serializers for our shopping cart models """
from rest_framework import serializers

from . import models


class CartItemSerializer(serializers.ModelSerializer):
    """ Serializer for our CartItem model """

    class Meta:
        model = models.CartItem
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    """ Serializer for our Item model """

    class Meta:
        model = models.Item
        fields = '__all__'
