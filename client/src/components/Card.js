import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';

class Card extends PureComponent {
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
    this.setState({ showAnswer: false });
    this.props.updateCardRating(this.props.cardData.id, this.state.selected);
  };

  render() {
    let { question, answer } = this.props.cardData;
    if (!this.state.showAnswer) {
      return (
        <div className="Card">
          <h3>Current Question</h3>
          <p>Q. {question}</p>
          <Button className="showAnswerBtn" onClick={this.clickHandler}>
            Show Answer
          </Button>
        </div>
      );
    } else {
      return (
        <div className="Card">
          <h3>Rate Question Difficulty</h3>
          <p>Q. {question}</p>
          <p>A. {answer}</p>
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
            <Button type="submit">Save</Button>
          </form>
        </div>
      );
    }
  }
}

export default Card;
