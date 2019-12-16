FROM python:3.8.0-buster

WORKDIR /var/shopping-cart
COPY requirements.txt requirements.txt
COPY shopping_cart shopping_cart

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN python shopping_cart/manage.py migrate

ENTRYPOINT ["python", "shopping_cart/manage.py"]
