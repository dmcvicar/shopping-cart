import './ShoppingCartApp.css';

import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import CartPage from './cart/CartPage'
import ItemPage from './items/ItemPage'

class ShoppingCartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'items', cart: {}, cartItemCount: 0}
    this.setPage = this.setPage.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    let cart = this.state.cart
    let cartItemCount = this.state.cartItemCount
    fetch('api/cart-item')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      data.forEach((cartItem) => {
        cart[cartItem.id] = {id: cartItem.id, quantity: cartItem.quantity}
        cartItemCount += cartItem.quantity
      })
      this.setState({currentPage: this.state.currentPage, cart: cart, cartItemCount: cartItemCount})
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
    this.setState({currentPage: this.state.currentPage, cart: cart, cartItemCount: cartItemCount})
  }

  removeFromCart(itemId) {

  }

  setPage(e) {
    this.setState({currentPage: e, cart: this.state.cart});
  }

  render() {
    let page;
    if (this.state.currentPage === 'items') {
      page = <ItemPage addToCart={this.addToCart}/>
    } else {
      page = <CartPage removeFromCart={this.removeFromCart}/>
    }
    return (
      <div>
        <Navbar className="navbar" bg="dark" variant="dark">
          <Navbar.Brand>Shopping Cart</Navbar.Brand>
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
