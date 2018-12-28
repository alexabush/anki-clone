import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ShowDeck from './ShowDeck';
import UseDeck from './UseDeck';
import ManageDeck from './ManageDeck';

class SelectDeck extends PureComponent {
  state = {
    decks: []
  };

  componentDidMount() {
    // implement auth
    fetch('http://localhost:3001/api/users/2/decks')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prev => {
          return { decks: data.decks };
        });
      });
  }

  render() {
    let { userId } = this.props.nav.match.params;
    let decksLis = this.state.decks.map(({ name, id }) => {
      return (
        <li>
          {name}
          {' '}
          <Link to={`/users/${userId}/decks/${id}/useDeck`}>Use</Link>
          {' '}
          <Link to={`/users/${userId}/decks/${id}/manageDeck`}>Manage</Link>
        </li>
      );
    });
    return (
      <div>
        <h1>Select Deck</h1>
        <ol>{decksLis}</ol>
      </div>
    );
  }
}

export default SelectDeck;
