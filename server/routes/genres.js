const express = require('express');
const router = express.Router();

const genres= [
  {id:1, name:'drama'},
  {id:2, name:'horror'},
  {id:3, name:'action'},
  {id:4, name:'comedy'},
  {id:5, name:'thriller'},
  {id:6, name:'science fiction'},
  {id:7, name:'kids'},
];

// GET
router.get('/', (req,res) => {
  res.send(genres);
});

router.get('/:genre', (req,res) => {
  let genre = genres.find(genre => genre.name === req.params.genre);
  res.send(genre);
});

// POST
router.post('/', (req,res) => {
  const {error} = validateGenre(req.body);
  let genre_exists = genres.find(genre => genre.name === req.body.name);
  if(error) res.status(400).send(error.details[0].message);
  if(genre_exists) res.status(400).send(`The genre ${req.body.name} already exists`);

  const genre = {
    id: genres.length+1,
    name: req.body.name
  }
  genres.push(genre);
  res.send(genre);
});

// PUT
router.put('/:id', (req,res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if(!genre) res.staus(404).send('No genre with that id exists');
  const {error} = validateGenre(req.body);
  if(error) res.status(400).send(error.details[0].message);
  genre.name = req.body.name;
  res.send(genre);
});

// DELETE
router.delete('/:id', (req,res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if(!genre) res.staus(404).send('No genre with that id exists');
  let index = genres.indexOf(genre);
  genres.splice(index,1);
  res.send(genre);
});


function validateGenre(genre){
  const schema ={
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, schema);
}

module.exports = router;
