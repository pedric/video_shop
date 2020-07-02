const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../../models/genre');

// GET
router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res) => {
  let genre = await Genre.findById(req.params.id);
  if(!genre)return res.status(404).send('No genre found with htat ID');
  res.send(genre);
});

// POST
router.post('/', auth, async (req,res) => {



  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

// PUT
router.put('/:id', auth, async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  if(!genre) res.staus(404).send('No genre with that id exists');

  res.send(genre);
});

// DELETE
router.delete('/:id', auth, async (req,res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id)

  if(!genre) res.staus(404).send('No genre with that id exists');

  res.send(genre);
});

module.exports = router;
