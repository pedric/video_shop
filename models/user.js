const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true

  },
  password: {
      type: String,
      required: true
  },
  userSince: {
    type: Date,
    default: Date.Now
  }
}));

function validateUser(user) {

  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    userSince: Joi.date()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
