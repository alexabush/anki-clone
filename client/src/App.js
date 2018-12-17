import React, { Component } from 'react';
import uuid from 'uuidv4'
import './App.css';

const cardsData = [];
cardsData.push(createCard('What color is the sky?', 'Go play outside'));
cardsData.push(createCard('What color is the ocean?', 'Blue'));
cardsData.push(createCard('Why?', 'Go watch tv'));

function createCard(q, a) {
  // add an uuid id
  return {
    id: uuid(),
    question: q,
    answer: a,
    ratings: {
      easy: 0,
      medium: 0,
      hard: 0
    },
    priorityScore: 0
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
      let newQueue = [];
      for (let card of cardsData) {
        newQueue.push(card);
      }
      let newCard = newQueue.shift();
      return { priorityQueue: newQueue, currentCard: newCard };
    });
  }

  changeRating = (cardId, rating = 'hard') => {
    // make patch to server with updated rating

    // push to priority queue with new rating and 'priorityScore'
  };

  render() {
    console.log('this.state', this.state)
    return (
      <div>
        <Card data={this.state.currentCard} />
        <Buttons />
      </div>
    );
  }
}

class Card extends Component {
  render() {
    let { question, answer, id } = this.props.data;
    return (
      <div>
        <p>{question}</p>
        <p>{answer}</p>
      </div>
    );
  }
}

class Buttons extends Component {
  render() {
    return <div />;
  }
}
export default App;
