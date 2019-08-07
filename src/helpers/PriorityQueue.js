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

export default PriorityQueue