import React, { PureComponent } from 'react';

class AddUserForm extends PureComponent {
  state = { name: '', email: '', password: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: e.target.value });
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserForm;
