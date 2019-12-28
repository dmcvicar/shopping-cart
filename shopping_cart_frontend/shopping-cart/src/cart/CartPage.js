import './CartPage.css';

import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class CartPage extends React.Component {

  constructor(props) {
    super(props);
    let items = {}
    this.props.items.forEach(item => {
      items[item.id] = item;
    })
    this.state = {items: items}
  }

  render() {
    var tabledata = [];
    var total_price = 0;
    Object.keys(this.props.cart).forEach(itemId => {
      let item = this.state.items[itemId]
      tabledata.push(
        <tr key={itemId}>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>{this.props.cart[itemId].quantity}</td>
          <td><Button onClick={() => this.props.removeFromCart(this.props.cart[itemId].id, itemId)}>Remove</Button></td>
        </tr>
      );
      total_price += (item.price * this.props.cart[itemId].quantity)
    });
    let totals = (
      <tr>
        <td></td>
        <td>${total_price}</td>
        <td></td>
        <td><Button disabled>Checkout</Button></td>
      </tr>
    );

    let mainapp = Object.keys(this.props.cart).length ? (
      <Container>
        <Table bordered className="mainapp">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tabledata}
            {totals}
          </tbody>
        </Table>
      </Container>
    ): (<div className="mainapp">Add things to your cart in the Items page.</div>);
    return mainapp;
  }
}

export default CartPage;
