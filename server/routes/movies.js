const express = require('express');
const mongoose = require('mongoose');
const {Genre} = require('../../models/genre');
const { Movie, validate } = require('../../models/movie');
const router = express.Router();

// GET
router.get('/', async (req,res) => {
  const movies = await Movie
  .find()
  .sort('title');
  res.send(movies);
});

router.get('/:id', async (req,res) => {
  const movie = Movie
  .findById(req.params.id)
  .populate('Genre');
  res.send(movie);
});

// POST
router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) res.status(400).send('Genre not found.');

  let movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  });

  movie = await movie.save();
  res.send(movie);
});

// PUT
router.put('/:id', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) res.status(400).send('Genre not found.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
  {
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  }, { new: true });

  if(!movie) res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

// DELETE
router.delete('/:id', async (req,res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if(!movie) res.status(404).send('No movie with that ID found');
  res.send(movie);
});

module.exports = router;
