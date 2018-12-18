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
    models.Decks.findAll().then(users => {
      res.json({ message: 'this is all users', data: users });
    });
  })
  .post(function(req, res, next) {
    // get user data from req
    console.log('in / decks post');
    res.json({ message: 'posted a deck' });
  });
// ROUTER FOR DECKS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:id/decks/:deckId')
  .get(function(req, res, next) {
    console.log('in / deck get by id');
    res.json({ message: 'got deck by id' });
  })
  .put(function(req, res, next) {
    // get deck data from req
    console.log('in / deck update');
    res.json({ message: 'updated a deck' });
  })
  .delete(function(req, res, next) {
    // get deck data from req
    console.log('in / deck delete');
    res.json({ message: 'deleted a deck' });
  });
// ROUTER FOR CARDS => GET ALL, POST
router
  .route('/users/:id/decks/:deckId/cards')
  .get(function(req, res, next) {
    console.log('in / cards get');
    res.json({ message: 'this is all cards' });
  })
  .post(function(req, res, next) {
    // get user data from req
    console.log('in / cards post');
    res.json({ message: 'posted a card' });
  });
// ROUTER FOR CARDS => GET BY ID, UPDATE, DELETE
router
  .route('/users/:id/decks/:deckId/cards/:cardId')
  .get(function(req, res, next) {
    console.log('in / card get by id');
    res.json({ message: 'got card by id' });
  })
  .put(function(req, res, next) {
    // get deck data from req
    console.log('in / card update');
    res.json({ message: 'updated a card' });
  })
  .delete(function(req, res, next) {
    // get card data from req
    console.log('in / card delete');
    res.json({ message: 'deleted a card' });
  });

module.exports = router;
