import React, { PureComponent } from 'react';

class AddCardForm extends PureComponent {
  state = { name: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addDeck(this.state.name);
    this.setState({ name: ''});
  };

  render() {
    return (
      <div className="AddDeckForm">
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddCardForm;
