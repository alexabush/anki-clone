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
      res.json({ message: 'this is all users', users });
    });
  })
  .post(function(req, res, next) {
    let { name, email, password } = req.body;
    models.User.create({
      name,
      email,
      password
    }).then(function(user) {
      res.json({ message: 'posted a user', user });
    });
  });
// ROUTER FOR USERS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:userId')
  .get(function(req, res, next) {
    console.log('in / user get by id');
    models.User.findOne({
      where: { id: req.params.userId }
    }).then(user => {
      res.json({ message: 'got user by id', user });
    });
  })
  .put(function(req, res, next) {
    let newData = _.pickBy(req.body, data => !!data);
    models.User.update(newData, {
      returning: true,
      where: { id: req.params.userId }
    }).then(queryData => {
      let updatedUser = queryData[1];
      res.json({ message: 'updated a user', updatedUser });
    });
  })
  .delete(function(req, res, next) {
    models.User.destroy({
      where: {
        id: req.params.userId
      }
    }).then(() => {
      res.json({ message: 'deleted a user' });
    });
  });
// ROUTER FOR DECKS => GET ALL, POST
router
  .route('/users/:userId/decks')
  .get(function(req, res, next) {
    models.Deck.findAll({
      where: {
        userId: req.params.userId
      }
    })
    .then(decks => {
      res.json({ message: 'this is all decks', decks });
    });
  })
  .post(function(req, res, next) {
    models.Deck.create({
      name: req.body.name,
      userId: req.params.userId
    }).then(function(deck) {
      res.json({ message: 'posted a deck', deck });
    });
  });
// ROUTER FOR DECKS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:userId/decks/:deckId')
  .get(function(req, res, next) {
    let { userId, deckId } = req.params;
    models.Deck.findOne({
      where: { id: deckId, userId }
    }).then(deck => {
      res.json({ message: 'got deck by id', deck });
    });
  })
  .put(function(req, res, next) {
    let { userId, deckId } = req.params;
    let newData = _.pickBy(req.body, data => !!data);
    models.Deck.update(newData, {
      returning: true,
      where: { id: deckId, userId }
    })
      .then(queryData => {
        let deck = queryData[1];
        res.json({ message: 'updated a deck', deck });
      })
      .catch(e => {
        console.log('error in deckId put');
        res.json({ message: 'error', data: e });
      });
  })
  .delete(function(req, res, next) {
    let { userId, deckId } = req.params;
    models.Deck.destroy({
      where: { id: deckId, userId }
    }).then(() => {
      res.json({ message: 'deleted a deck' });
    });
  });
// ROUTER FOR CARDS => GET ALL, POST
router
  .route('/users/:userId/decks/:deckId/cards')
  .get(function(req, res, next) {
    // should only return cards from the deck and user specified
    models.Card.findAll().then(cards => {
      res.json({ message: 'this is all cards', cards });
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
      priority,
      deckId: req.params.deckId
    }).then(function(card) {
      res.json({ message: 'posted a card', card });
    });
  });
// ROUTER FOR CARDS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:userId/decks/:deckId/cards/:cardId')
  .get(function(req, res, next) {
    let { cardId, deckId } = req.params;
    models.Card.findOne({
      where: { id: cardId, deckId }
    }).then(card => {
      res.json({ message: 'got card by id', card });
    });
  })
  .put(function(req, res, next) {
    let { cardId, deckId } = req.params;
    let newData = _.pickBy(req.body, data => !!data);
    console.log(newData)
    models.Card.update(newData, {
      returning: true,
      where: { id: cardId, deckId }
    }).then(queryData => {
      let card = queryData[1];
      res.json({ message: 'updated a user', card });
    });
  })
  .delete(function(req, res, next) {
    let { cardId, deckId } = req.params;
    models.Card.destroy({
      where: { id: cardId, deckId }
    }).then(() => {
      res.json({ message: 'deleted a card' });
    });
  });

module.exports = router;
