import React, { PureComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddDeckForm extends PureComponent {
  state = { name: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addDeck(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <div className="AddDeckForm">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>
              Name:
              <Form.Control
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Label>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AddDeckForm;
