var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('in / get handler');
  res.json({ message: 'this is from the api' });
});

// ROUTER FOR USERS => GET ALL, POST
router
  .route('/users')
  .get(function(req, res, next) {
    models.User.findAll().then(users => {
      res.json({ message: 'this is all users', data: users });
    });
  })
  .post(function(req, res, next) {
    let { name, email, password } = req.body;
    models.User.create({
      name,
      email,
      password
    }).then(function(user) {
      res.json({ message: 'posted a user', data: user });
    });
  });
// ROUTER FOR USERS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:id')
  .get(function(req, res, next) {
    console.log('in / user get by id');
    models.User.findOne({
      where: { id: req.params.id }
    }).then(user => {
      res.json({ message: 'got user by id', data: user });
    });
  })
  .put(function(req, res, next) {
    let newData = _.pickBy(req.body, data => !!data);
    models.User.update(newData, {
      returning: true,
      where: { id: req.params.id }
    }).then(queryData => {
      let updatedTodo = queryData[1];
      res.json({ message: 'updated a user', data: updatedTodo });
    });
  })
  .delete(function(req, res, next) {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.json({ message: 'deleted a user' });
    });
  });
// ROUTER FOR DECKS => GET ALL, POST
router
  .route('/users/:id/decks')
  .get(function(req, res, next) {
    models.Deck.findAll().then(decks => {
      res.json({ message: 'this is all decks', data: decks });
    });
  })
  .post(function(req, res, next) {
    // get user data from req
    models.Deck.create({
      name: req.body.name
    }).then(function(deck) {
      res.json({ message: 'posted a deck', data: deck });
    });
  });
// ROUTER FOR DECKS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:id/decks/:deckId')
  .get(function(req, res, next) {
    // res.json({params: req.params})
    models.Deck.findOne({
      where: { deckId: req.params.deckId }
    }).then(deck => {
      res.json({ message: 'got deck by id', data: deck });
    });
  })
  .put(function(req, res, next) {
    let newData = _.pickBy(req.body, data => !!data);
    models.Deck.update(newData, {
      returning: true,
      where: { deckId: req.params.deckId }
    }).then(queryData => {
      let updatedTodo = queryData[1];
      res.json({ message: 'updated a deck', data: updatedTodo });
    });
  })
  .delete(function(req, res, next) {
    models.Deck.destroy({
      where: {
        deckId: req.params.deckId
      }
    }).then(() => {
      res.json({ message: 'deleted a deck' });
    });
  });
// ROUTER FOR CARDS => GET ALL, POST
router
  .route('/users/:id/decks/:deckId/cards')
  .get(function(req, res, next) {
    models.Card.findAll().then(cards => {
      res.json({ message: 'this is all cards', data: cards });
    });
  })
  .post(function(req, res, next) {
    let { question, answer, easy, medium, hard, priority } = req.body;
    models.Card.create({
      question,
      answer,
      easy,
      medium,
      hard,
      priority
    }).then(function(card) {
      res.json({ message: 'posted a card', data: card });
    });
  });
// ROUTER FOR CARDS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:id/decks/:deckId/cards/:cardId')
  .get(function(req, res, next) {
    models.Card.findOne({
      where: { cardId: req.params.cardId }
    }).then(card => {
      res.json({ message: 'got card by id', data: card });
    });
  })
  .put(function(req, res, next) {
    let newData = _.pickBy(req.body, data => !!data);
    models.Card.update(newData, {
      returning: true,
      where: { cardId: req.params.cardId }
    }).then(queryData => {
      let updatedCard = queryData[1];
      res.json({ message: 'updated a user', data: updatedCard });
    });
  })
  .delete(function(req, res, next) {
    models.Card.destroy({
      where: {
        cardId: req.params.cardId
      }
    }).then(() => {
      res.json({ message: 'deleted a card' });
    });
  });

module.exports = router;
