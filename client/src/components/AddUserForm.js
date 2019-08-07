import React, { PureComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddUserForm extends PureComponent {
  state = { name: '', email: '', password: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.addUser(name, email, password);
    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    return (
      <div className="AddUserForm">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="userName">
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

          <Form.Group controlId="userEmail">
            <Form.Label>
              Email:
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="userPassword">
            <Form.Label>
              Password:
              <Form.Control
                type="text"
                name="password"
                value={this.state.password}
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

export default AddUserForm;
