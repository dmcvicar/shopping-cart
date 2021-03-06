import './ShoppingCartApp.css';

import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import CartPage from './cart/CartPage'
import ItemPage from './items/ItemPage'

class ShoppingCartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'items', items: [], cart: {}, cartItemCount: 0}
    this.setPage = this.setPage.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.adjustCartQuantity = this.adjustCartQuantity.bind(this);
    this.incrementCartQuantity = this.incrementCartQuantity.bind(this);
    this.decrementCartQuantity = this.decrementCartQuantity.bind(this);
  }

  componentDidMount() {
    let cart = this.state.cart
    let cartItemCount = this.state.cartItemCount
    let items = this.state.items
    fetch('api/item')
    .then(res => res.json())
    .then((data) => {
      items = data;
    })
    .catch(console.log);
    fetch('api/cart-item')
    .then(res => res.json())
    .then((data) => {
      data.forEach((cartItem) => {
        cart[cartItem.id] = {id: cartItem.id, quantity: cartItem.quantity}
        cartItemCount += cartItem.quantity
      })
      this.setState({
        currentPage: this.state.currentPage,
        items: items,
        cart: cart,
        cartItemCount: cartItemCount
      })
    })
    .catch(console.log);
  }

  addToCart(itemId) {
    let cart = this.state.cart
    let cartItemCount = this.state.cartItemCount
    if(cart[itemId] === undefined) {
      fetch('/api/cart-item', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cart: 1, item: itemId, quantity: 1})
      })
      .then(res => res.json())
      .then((data) => {
        cart[itemId] = {id: data.id, quantity: 1}
      })
      .catch(console.log);
    } else {
      fetch('/api/cart-item/' + this.state.cart[itemId].id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quantity: this.state.cart[itemId].quantity+1})
      })
      cart[itemId].quantity++;
    }
    cartItemCount++;
    this.setState({currentPage: this.state.currentPage,
                   cart: cart,
                   cartItemCount: cartItemCount,
                   items: this.state.items})
  }

  removeFromCart(cartItemId, itemId) {
    fetch('/api/cart-item/' + cartItemId, {method: 'DELETE'})
    let cart = this.state.cart;
    let cartItemCount = this.state.cartItemCount;
    cartItemCount = cartItemCount - cart[itemId].quantity;
    delete cart[itemId];
    this.setState({currentPage: this.state.currentPage,
                   cart: cart,
                   cartItemCount: cartItemCount,
                   items: this.state.items})
  }

  adjustCartQuantity(itemId, delta) {
    let cart = this.state.cart;
    let cartItemCount = this.state.cartItemCount;
    fetch('/api/cart-item/' + this.state.cart[itemId].id, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({quantity: this.state.cart[itemId].quantity+delta})
    })
    cart[itemId].quantity += delta;
    cartItemCount += delta;
    this.setState({currentPage: this.state.currentPage,
                   cart: cart,
                   cartItemCount: cartItemCount,
                   items: this.state.items})
  }

  decrementCartQuantity(itemId) {
    this.adjustCartQuantity(itemId, -1)
  }

  incrementCartQuantity(itemId) {
    this.adjustCartQuantity(itemId, 1)
  }

  setPage(e) {
    this.setState({currentPage: e,
                   cart: this.state.cart,
                   cartItemCount: this.state.cartItemCount,
                   items: this.state.items});
  }

  render() {
    let page;
    if (this.state.currentPage === 'items') {
      page = <ItemPage addToCart={this.addToCart} items={this.state.items}/>
    } else {
      page = <CartPage removeFromCart={this.removeFromCart}
                       incrementCartQuantity={this.incrementCartQuantity}
                       decrementCartQuantity={this.decrementCartQuantity}
                       cart={this.state.cart}
                       items={this.state.items}/>
    }
    return (
      <div>
        <Navbar fixed="top" className="navbar" bg="dark" variant="dark">
          <Navbar.Brand>Blamazon</Navbar.Brand>
          <Nav activeKey="items" onSelect={this.setPage}>
            <Nav.Item>
              <Nav.Link eventKey='items'>Items</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav activeKey="cart" onSelect={this.setPage}>
            <Nav.Item>
              <Nav.Link eventKey='cart'>Cart{this.state.cartItemCount !== 0 ? " (" + this.state.cartItemCount + ")" : ''}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        {page}
      </div>
    );
  }
}

export default ShoppingCartApp;
