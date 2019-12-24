import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
      <Col lg={4}>
        <Card>
          <Card.Img variant="top" src={item.thumbnail_key}/>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
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
