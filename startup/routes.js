const express = require('express');
const error = require('../middleware/error');
const genres = require('../server/routes/genres');
const home = require('../server/routes/home');
const customers = require('../server/routes/customers');
const movies = require('../server/routes/movies');
const rentals = require('../server/routes/rentals');
const users = require('../server/routes/users');
const auth = require('../server/routes/auth');

module.exports = function(app){
  app.use(express.json());
  app.use('/api/customers', customers);
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/', home);
  app.use(error);
}
