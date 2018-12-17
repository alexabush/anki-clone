import React, { Component } from 'react';
import uuid from 'uuid/v4';
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

  updateCardRating = (cardId, rating = 'hard') => {
    this.setState(prev => {
      prev.currentCard[rating] += 1;
      prev.priorityQueue.push(prev.currentCard)
      let newCurrentCard = prev.priorityQueue.shift()
      return {currentCard: newCurrentCard, priorityQueue: prev.priorityQueue}
    })
    // make patch to server with updated rating
    // push to priority queue with new rating and 'priorityScore'
  };

  render() {
    console.log('this.state', this.state);
    return (
      <div>
        <Card data={this.state.currentCard} updateCardRating={this.updateCardRating} />
        <Buttons />
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

class Buttons extends Component {
  render() {
    return <div />;
  }
}
export default App;
