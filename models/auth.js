const Joi = require('joi');
const mongoose = require('mongoose');

const Auth = mongoose.model('Auth', new mongoose.Schema({
  email: {
      type: String
    },
    time: {
      type: Date,
      default: Date.Now
    },
    password: {
      type: String
    }
}));

function validateLogin(auth) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string()
  };
  return Joi.validate(auth, schema);
}

exports.Auth = Auth;
exports.validate = validateLogin;
