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
      cardLis = this.props.priorityQueue.getDeck.map(card => {
        return (
          <li key={uuid()}>
            {`${card.question} ${card.priority}`}
            { (this.props.allowDelete) ?
              <Delete onClick={() => this.handleDelete(card.id)} />
              : null
            }
          </li>
        );
      });
    }
    return (
      <div className="Deck">
        <ul>{cardLis}</ul>
      </div>
    );
  }
}

export default Deck;
