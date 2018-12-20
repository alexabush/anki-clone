import React, { PureComponent } from 'react';

class AddCardForm extends PureComponent {
  state = { q: '', a: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addCard(this.state.q, this.state.a);
    this.setState({ q: '', a: '' });
  };

  render() {
    return (
      <div className="AddCardForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Question:
            <input
              type="text"
              name="q"
              value={this.state.q}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              name="a"
              value={this.state.a}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
