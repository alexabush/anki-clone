import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import UseDeck from './components/UseDeck'
import ManageDeck from './components/ManageDeck'

// these will be dynamic later
let userId = 1;
let deckId = 1;

const cardsData = [];
cardsData.push(createCard('q1', 'a1'));
cardsData.push(createCard('q2', 'a2'));
cardsData.push(createCard('q3', 'a3'));
cardsData.push(createCard('q4', 'a4'));
cardsData.push(createCard('q5', 'a5'));
cardsData.push(createCard('q6', 'a6'));
cardsData.push(createCard('q7', 'a7'));
cardsData.push(createCard('q8', 'a8'));

function createCard(
  id,
  question,
  answer,
  easy = 0,
  medium = 0,
  hard = 0,
  priority = 0
) {
  return {
    id,
    question,
    answer,
    priority,
    easy,
    medium,
    hard
  };
}

class App extends PureComponent {
  state = {
    currentCard: {},
    priorityQueue: []
  };

  componentDidMount() {
    // implement auth
    fetch('http://localhost:3001/api/users/2/decks/4/cards')
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
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <UseDeck
              currentCard={this.state.currentCard}
              updateCardRating={this.updateCardRating}
              priorityQueue={this.state.priorityQueue}
              deleteCard={this.deleteCard}
            />
          </div>

          <div className="row">
            <ManageDeck
              priorityQueue={this.state.priorityQueue}
              deleteCard={this.deleteCard}
              addCard={this.addCard}
            />
          </div>
        </div>
      </div>
    );
  }
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  get getDeck() {
    return this.queue;
  }

  push = card => {
    for (let i = this.queue.length - 1; i >= 0; i--) {
      if (this.queue[i].priority < card.priority) continue;
      this.queue.splice(i + 1, 0, card);
      return;
    }
    this.queue.unshift(card);
  };

  pop = () => {
    let card = this.queue.pop();
    return card;
  };

  peek = () => {
    return this.queue[this.queue.length - 1];
  };

  removeById = cardId => {
    this.queue = this.queue.filter(card => {
      return card.id !== cardId;
    });
    return this;
  };
}

function calcPriority(easy = 0, medium = 0, hard = 0) {
  let priorityScore = easy * 10 + medium * 5 + hard * 1;
  return priorityScore;
}

export default App;

