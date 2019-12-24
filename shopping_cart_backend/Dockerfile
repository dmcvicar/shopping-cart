FROM python:3.8.0-buster

WORKDIR /var/shopping-cart
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ADD shopping_cart .
RUN python manage.py migrate

ENTRYPOINT ["python", "manage.py"]
