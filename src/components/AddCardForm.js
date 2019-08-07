import React, { PureComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddCardForm extends PureComponent {
  state = { question: '', answer: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addCard(this.state.question, this.state.answer);
    this.setState({ question: '', answer: '' });
  };

  render() {
    return (
      <div className="AddCardForm">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="question">
            <Form.Label>
              Name:
              <Form.Control
                type="text"
                name="question"
                value={this.state.question}
                onChange={this.handleChange}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="answer">
            <Form.Label>
              Answer:
              <Form.Control
                type="text"
                name="answer"
                value={this.state.answer}
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

export default AddCardForm;
