import React, { PureComponent } from 'react';
// import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import UseDeck from './UseDeck';
import ManageDeck from './ManageDeck';
import createCard from '../helpers/createCard.js';
import PriorityQueue from '../helpers/PriorityQueue.js';
import calcPriority from '../helpers/calcPriority.js';

class ShowDeck extends PureComponent {
  state = {
    currentCard: {},
    priorityQueue: new PriorityQueue()
  };

  componentDidMount() {
    // implement auth
    let { userId, deckId } = this.props.nav.match.params;
    fetch(`/api/users/${userId}/decks/${deckId}/cards`)
      .then(res => res.json())
      .then(data => {
        this.setState(state => {
          if (data.cards.length < 1) return state;
          const newPriorityQueue = this.buildPriorityQueue(data.cards);
          let newCard = newPriorityQueue.peek();
          return { priorityQueue: newPriorityQueue, currentCard: newCard };
        });
      });
  }

  buildPriorityQueue = cards => {
    const newPriorityQueue = new PriorityQueue();
    cards.forEach(card => {
      let { id, question, answer, easy, medium, hard, priority } = card;
      newPriorityQueue.push(
        createCard(id, question, answer, easy, medium, hard, priority)
      );
    });
    return newPriorityQueue;
  };

  addCard = (question, answer) => {
    let { userId, deckId } = this.props.nav.match.params;
    fetch(`/api/users/${userId}/decks/${deckId}/cards`, {
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
          const newPriorityQueue = this.buildPriorityQueue([
            ...prev.priorityQueue.getDeck,
            card
          ]);
          return { priorityQueue: newPriorityQueue };
        });
      });
  };

  deleteCard = cardId => {
    let { userId, deckId } = this.props.nav.match.params;
    fetch(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    // bug where if current card is deleted it doesn't get deleted
    this.setState(prev => {
      let modifiedQueue = prev.priorityQueue.removeById(cardId);
      return { priorityQueue: modifiedQueue };
    });
  };

  updateCardRating = (cardId, rating = 'hard') => {
    let { userId, deckId } = this.props.nav.match.params;
    let cardClone = { ...this.state.currentCard };
    cardClone[rating] = cardClone[rating] + 1;
    let { easy, medium, hard } = cardClone;
    let updateData = {
      [rating]: cardClone[rating],
      priority: calcPriority(easy, medium, hard)
    };
    fetch(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
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
