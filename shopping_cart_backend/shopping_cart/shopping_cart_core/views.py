""" views.py describe ViewSets for our shopping cart models """
from rest_framework import viewsets

from . import models
from . import serializers


class CartItemViewSet(viewsets.ModelViewSet):
    """ ViewSet for our CartItem model """
    queryset = models.CartItem.objects.all()
    serializer_class = serializers.CartItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    """ ViewSet for our Item model """
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
