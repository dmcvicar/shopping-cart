import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import CartPage from './cart/CartPage'
import ItemPage from './items/ItemPage'

class ShoppingCartApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 'items'}
    this.setPage = this.setPage.bind(this);
  }

  setPage(e) {
    this.setState({currentPage: e})
  }

  render() {
    let page;
    if (this.state.currentPage === 'items') {
      page = <ItemPage/>
    } else {
      page = <CartPage/>
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Shopping Cart</Navbar.Brand>
          <Nav activeKey="items" onSelect={this.setPage}>
            <Nav.Item>
              <Nav.Link eventKey='items'>Items</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav activeKey="cart" onSelect={this.setPage}>
            <Nav.Item>
              <Nav.Link eventKey='cart'>Cart</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        {page}
      </div>
    );
  }
}

export default ShoppingCartApp;
