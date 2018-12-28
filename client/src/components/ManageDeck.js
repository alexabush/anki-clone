import React, { PureComponent } from 'react';
import Deck from './Deck';
import AddCardForm from './AddCardForm';

class ManageDeck extends PureComponent {
  render() {
    return (
      <div className="ManageDecks">
        <h1>Manage Deck</h1>
        <Deck
          priorityQueue={this.props.priorityQueue}
          deleteCard={this.props.deleteCard}
          allowDelete={true}
        />
        <AddCardForm addCard={this.props.addCard} />
      </div>
    );
  }
}

export default ManageDeck;
