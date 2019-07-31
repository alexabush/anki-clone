import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddUserForm from './AddUserForm';

export class ManageUsers extends Component {
  static propTypes = {};

  state = {
    users: []
  };

  componentDidMount() {
    // implement auth
    fetch(`http://localhost:3001/api/users`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        this.setState(state => {
          if (data.users.length < 1) return state;
          return { users: data.users };
        });
      });
  }

  addUser = (name, email, password) => {
    console.log('in showdeck.js addUser');
    fetch(`http://localhost:3001/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(({ user }) => {
        this.setState(prev => {
          return { users: [...prev.users, user] };
        });
      });
  };

  //   deleteCard = cardId => {
  //     let { userId, deckId } = this.props.nav.match.params;
  //     fetch(
  //       `http://localhost:3001/api/users/${userId}/decks/${deckId}/cards/${cardId}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     // bug where if current card is deleted it doesn't get deleted
  //     this.setState(prev => {
  //       let modifiedQueue = prev.priorityQueue.removeById(cardId);
  //       return { priorityQueue: modifiedQueue };
  //     });
  //   };

  //   updateCardRating = (cardId, rating = 'hard') => {
  //     let { userId, deckId } = this.props.nav.match.params;
  //     let cardClone = { ...this.state.currentCard };
  //     cardClone[rating] = cardClone[rating] + 1;
  //     let { easy, medium, hard } = cardClone;
  //     let updateData = {
  //       [rating]: cardClone[rating],
  //       priority: calcPriority(easy, medium, hard)
  //     };
  //     fetch(
  //       `http://localhost:3001/api/users/${userId}/decks/${deckId}/cards/${cardId}`,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(updateData)
  //       }
  //     );
  //     this.setState(prev => {
  //       let prevCard = prev.currentCard;
  //       prevCard[rating] += 1;
  //       prevCard.priority = updateData.priority;
  //       prev.priorityQueue.pop();
  //       prev.priorityQueue.push(prevCard);
  //       let newCurrentCard = prev.priorityQueue.peek();
  //       return { currentCard: newCurrentCard, priorityQueue: prev.priorityQueue };
  //     });
  //   };

  render() {
    return (
      <div className="ShowDeck">
        <ul>
          {this.state.users.map(({ id: userId, name, email }) => {
            return (
              <li>
                {name} {email}
                <Link to={`/users/${userId}/decks`}>View Decks</Link>
              </li>
            );
          })}
        </ul>
        <AddUserForm addUser={this.addUser} />
      </div>
    );
  }
}

export default ManageUsers;
