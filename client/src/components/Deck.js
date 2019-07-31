import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import Delete from '@material-ui/icons/Delete';

class Deck extends PureComponent {
  handleDelete = id => {
    this.props.deleteCard(id);
  };

  render() {
    let cardLis = [];
    if (this.props.priorityQueue.getDeck) {
      cardLis = this.props.priorityQueue.getDeck.map((card, idx) => {
        return (
          <li className="card-li" key={uuid()}>
            {idx + 1} Q. {card.question}
            {this.props.allowDelete ? (
              <Delete onClick={() => this.handleDelete(card.id)} />
            ) : null}
          </li>
        );
      });
    }
    return (
      <div className="Deck">
        <h3>Upcoming Cards</h3>
        <ul>{cardLis}</ul>
      </div>
    );
  }
}

export default Deck;
