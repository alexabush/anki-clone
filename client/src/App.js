import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const data = []
data.push(createCard('What color is the sky?', 'Go play outside'))
data.push(createCard('What color is the ocean?', 'Blue'))
data.push(createCard('Why?', 'Go watch tv'))

function createCard(q, a) {
  // add an uuid id
  return {
    question: q,
    answer: a,
    ratings: {
      easy: 0,
      medium: 0,
      hard: 0,
    }
  }
}

class App extends Component {
  state = {
    priorityQueue = []
  }

  componentDidMount() {
    this.setState(prev => {
      prev.priorityQueue.push(...data)
    })
  }


  render() {
    return (
      <div>
        <Card />
        <Buttons />
      </div>
    );
  }
}


class Card extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}


class Buttons extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}
export default App;
