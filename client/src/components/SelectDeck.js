import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ShowDeck from './ShowDeck';
import UseDeck from './UseDeck';
import ManageDeck from './ManageDeck';
import AddDeckForm from './AddDeckForm';

class SelectDeck extends PureComponent {
  state = {
    decks: []
  };

  componentDidMount() {
    console.log('SelectDeck cdm');
    // implement auth
    let { userId } = this.props.nav.match.params;
    fetch(`http://localhost:3001/api/users/${userId}/decks`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prev => {
          return { decks: data.decks };
        });
      });
  }

  addDeck = deckName => {
    let { userId } = this.props.nav.match.params;
    fetch(`http://localhost:3001/api/users/${userId}/decks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: deckName })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prev => {
          return { decks: [...prev.decks, data.deck] };
        });
      });
  };

  render() {
    console.log('SelectDeck');
    let { userId } = this.props.nav.match.params;
    let decksLis = this.state.decks.map(({ name, id }) => {
      return (
        <li key={id}>
          {name} <Link to={`/users/${userId}/decks/${id}/useDeck`}>Use</Link>{' '}
          <Link to={`/users/${userId}/decks/${id}/manageDeck`}>Manage</Link>
        </li>
      );
    });
    return (
      <div>
        <h1>Select Deck</h1>
        <ol>{decksLis}</ol>
        <AddDeckForm addDeck={this.addDeck} />
        <Link to={`/users`}>Back to all users</Link>
      </div>
    );
  }
}

export default SelectDeck;
