import React, { PureComponent } from 'react';
import Card from './Card';
import Deck from './Deck';

class UseDeck extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <Card
              cardData={this.props.currentCard}
              updateCardRating={this.props.updateCardRating}
            />
          </div>
          <div className="col-sm-6">
            <Deck
              priorityQueue={this.props.priorityQueue}
              deleteCard={this.props.deleteCard}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UseDeck;
