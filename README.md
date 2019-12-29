# shopping-cart
A simple shopping cart application written by David McVicar

# Running the application
1. Download docker and ensure that you're logged in to DockerHub via the `docker login` shell command.
1. Run `docker-compose up` in the top level directory of this repo. This starts both the FE and BE at once.
1. Access the app at `localhost:3000`  
  1a. Django's browsable API is accessible at `localhost:8000/api/item` and `localhost:8000/api/cart-item`.

# Limitations
1. Occasionally the app fails with the error "Cannot access property "name" of "undefined"" when accessing the Cart page. Just refresh the app until this error goes away and items appear in the Items page.
1. When the app is refreshed, it will always go back to the Items page, though the state of your cart is preserved in Django. This is easily resolved by implementing React Routes.
1. As a novice React developer, I'd say there's large potential to refactor the frontend portion of the app. This was very much a learning experience for me.
