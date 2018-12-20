import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './App.css';

import Delete from '@material-ui/icons/Delete';

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

class App extends Component {
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

class UseDeck extends Component {
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

class ManageDeck extends Component {
  render() {
    return (
      <div className="ManageDecks">
        <h1>Manage Deck</h1>
        <Deck
          priorityQueue={this.props.priorityQueue}
          deleteCard={this.props.deleteCard}
        />
        <AddCardForm addCard={this.props.addCard} />
      </div>
    );
  }
}

class Card extends Component {
  state = { showAnswer: false, selected: 'hard' };

  clickHandler = () => {
    this.setState({ showAnswer: true });
  };

  handleSelectChange = e => {
    this.setState({ selected: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.updateCardRating(this.props.data.id, this.state.selected);
  };

  render() {
    let { question, answer, id } = this.props.cardData;
    if (!this.state.showAnswer) {
      return (
        <div className="Card">
          <p>{question}</p>
          <button className="showAnswerBtn" onClick={this.clickHandler}>
            Show Answer
          </button>
        </div>
      );
    } else {
      return (
        <div className="Card">
          <p>{question}</p>
          <p>{answer}</p>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="easy"
                  checked={this.state.selected === 'easy'}
                  onChange={this.handleSelectChange}
                />
                Easy
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="medium"
                  checked={this.state.selected === 'medium'}
                  onChange={this.handleSelectChange}
                />
                Medium
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="hard"
                  checked={this.state.selected === 'hard'}
                  onChange={this.handleSelectChange}
                />
                Hard
              </label>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      );
    }
  }
}

class AddCardForm extends Component {
  state = { q: '', a: '' };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addCard(this.state.q, this.state.a);
    this.setState({ q: '', a: '' });
  };

  render() {
    return (
      <div className="AddCardForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Question:
            <input
              type="text"
              name="q"
              value={this.state.q}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              name="a"
              value={this.state.a}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

class Deck extends Component {
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
            <Delete onClick={() => this.handleDelete(card.id)} />
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
