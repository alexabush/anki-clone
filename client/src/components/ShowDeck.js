import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UseDeck from './UseDeck';
import ManageDeck from './ManageDeck';
import createCard from '../helpers/createCard.js';
import PriorityQueue from '../helpers/PriorityQueue.js';
import calcPriority from '../helpers/calcPriority.js';

// these will be dynamic later
let userId = 1;
let deckId = 1;

class ShowDeck extends PureComponent {
  state = {
    currentCard: {},
    priorityQueue: []
  };

  componentDidMount() {
    // implement auth
    let { userId, deckId } = this.props.nav.match.params
    debugger
    fetch(`http://localhost:3001/api/users/${userId}/decks/${deckId}/cards`)
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          let queue = new PriorityQueue();
          for (let card of data.cards) {
            let { id, question, answer, easy, medium, hard, priority } = card;
            queue.push(
              createCard(id, question, answer, easy, medium, hard, priority)
            );
          }
          let newCard = queue.peek();
          return { priorityQueue: queue, currentCard: newCard };
        });
      });
  }

  addCard = (question, answer) => {
    fetch(`http://localhost:3001/api/users/${userId}/decks/${deckId}/cards`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, answer })
    })
      .then(res => res.json())
      .then(({ card }) => {
        this.setState(prev => {
          prev.priorityQueue.push(createCard(card.id, question, answer));
          return { priorityQueue: prev.priorityQueue };
        });
      });
  };

  deleteCard = cardId => {
    fetch(
      `http://localhost:3001/api/users/${userId}/decks/${deckId}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    // bug where if current card is deleted it doesn't get deleted
    this.setState(prev => {
      let modifiedQueue = prev.priorityQueue.removeById(cardId);
      return { priorityQueue: modifiedQueue };
    });
  };

  updateCardRating = (cardId, rating = 'hard') => {
    let cardClone = { ...this.state.currentCard };
    cardClone[rating] = cardClone[rating] + 1;
    let { easy, medium, hard } = cardClone;
    let updateData = {
      [rating]: cardClone[rating],
      priority: calcPriority(easy, medium, hard)
    };
    fetch(
      `http://localhost:3001/api/users/${userId}/decks/${deckId}/cards/${cardId}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      }
    );
    this.setState(prev => {
      let prevCard = prev.currentCard;
      prevCard[rating] += 1;
      prevCard.priority = updateData.priority;
      prev.priorityQueue.pop();
      prev.priorityQueue.push(prevCard);
      let newCurrentCard = prev.priorityQueue.peek();
      return { currentCard: newCurrentCard, priorityQueue: prev.priorityQueue };
    });
  };

  render() {
    let { userId } = this.props.nav.match.params;
    return (
      <div className="ShowDeck">
        <Link to={`/users/${userId}/decks`}>Back to all decks</Link>

        {this.props.status === 'use' ? (
          <UseDeck
            currentCard={this.state.currentCard}
            updateCardRating={this.updateCardRating}
            priorityQueue={this.state.priorityQueue}
            deleteCard={this.deleteCard}
          />
        ) : (
          <ManageDeck
            priorityQueue={this.state.priorityQueue}
            deleteCard={this.deleteCard}
            addCard={this.addCard}
          />
        )}
      </div>
    );
  }
}

export default ShowDeck;
