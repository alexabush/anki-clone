import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './App.css';

const cardsData = [];
// cardsData.push(createCard('What color is the sky?', 'Go play outside'));
// cardsData.push(createCard('What color is the ocean?', 'Blue'));
// cardsData.push(createCard('Why?', 'Go watch tv'));
// cardsData.push(createCard('Chicken or egg?', 'What is chicken?'));
// cardsData.push(createCard('Are you my mother?', 'Umm'));
// cardsData.push(createCard('Knock Knock?', '...'));
// cardsData.push(createCard('How?', 'What?'));
// cardsData.push(createCard('Does food === food?', 'Nope'));
cardsData.push(createCard('q1', 'a1'));
cardsData.push(createCard('q2', 'a2'));
cardsData.push(createCard('q3', 'a3'));
cardsData.push(createCard('q4', 'a4'));
cardsData.push(createCard('q5', 'a5'));
cardsData.push(createCard('q6', 'a6'));
cardsData.push(createCard('q7', 'a7'));
cardsData.push(createCard('q8', 'a8'));

function createCard(q, a) {
  // add an uuid id
  return {
    id: uuid(),
    question: q,
    answer: a,
    priority: 0,
    ratings: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  };
}

class App extends Component {
  state = {
    currentCard: {},
    priorityQueue: []
  };

  componentDidMount() {
    // api/data
    this.setState(() => {
      let queue = new PriorityQueue();
      for (let card of cardsData) {
        queue.push(card);
      }
      let newCard = queue.pop();
      return { priorityQueue: queue, currentCard: newCard };
    });
  }

  updateCardRating = (cardId, rating = 'hard') => {
    this.setState(prev => {
      let prevCard = prev.currentCard;
      prevCard.ratings[rating] += 1;
      prevCard.priority = calcPriority(prevCard.ratings);
      prev.priorityQueue.push(prevCard);
      let newCurrentCard = prev.priorityQueue.pop();
      return { currentCard: newCurrentCard, priorityQueue: prev.priorityQueue };
    });
    // make patch to server with updated rating
  };

  render() {
    console.log('this.state', this.state);
    return (
      <div>
        <Card
          data={this.state.currentCard}
          updateCardRating={this.updateCardRating}
        />
        <Deck currentCard={this.state.currentCard} priorityQueue={this.state.priorityQueue} />
      </div>
    );
  }
}

class Card extends Component {
  state = { showAnswer: true, selected: 'hard' };
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
    console.log(this.state.priorityQueue);
    let { question, answer, id } = this.props.data;
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

class Deck extends Component {
  render() {
    let cardLis = [];
    if (this.props.priorityQueue.getDeck) {
      cardLis = this.props.priorityQueue.getDeck.map(card => {
        return <li>{`${card.question} ${card.priority}`}</li>;
      });
    }
    cardLis.push(
      <li>{`${this.props.currentCard.question} ${
        this.props.currentCard.priority
      }`}</li>
    );
    return (
      <div>
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
      debugger
      this.queue.splice(i+1, 0, card);
      return;
    }
    this.queue.unshift(card);
  };

  pop = () => {
    let card = this.queue.pop();
    return card;
  };
}

function calcPriority(ratings = {}) {
  let lookup = {
    easy: 10,
    medium: 5,
    hard: 1
  };
  let priorityScore = Object.keys(ratings).reduce((acc, key) => {
    acc += ratings[key] * lookup[key];
    return acc;
  }, 0);
  return priorityScore;
}

export default App;
