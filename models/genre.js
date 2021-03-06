const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    monLength: 3,
    maxLength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
  const schema ={
    name: Joi.string()
  }
  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
