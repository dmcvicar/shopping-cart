import './ItemPage.css'

import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


class ItemPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {items: []}
  }

  componentDidMount() {
    fetch('api/item')
    .then(res => res.json())
    .then((data) => {
      this.setState({items: data})
    })
    .catch(console.log);
  }

  render() {
    const cards = this.state.items.map(item => (
      <Col lg={4} key={item.id} className="itemcolumn">
        <Card className="h-100">
          <Card.Img variant="top" src={item.thumbnail_key + ".jpg"}/>
          <Card.Body className="h-100">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>${item.price}</Card.Text>
            <Card.Text>{item.description}</Card.Text>
            <Button onClick={() => this.props.addToCart(item.id)}>Add to Cart</Button>
          </Card.Body>
        </Card>
      </Col>
    ));
    return (
      <Container>
        <Row>
          {cards}
        </Row>
      </Container>
    );
  }
}

export default ItemPage;
