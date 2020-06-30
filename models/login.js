const Joi = require('joi');
const mongoose = require('mongoose');

const Login = mongoose.model('Login', new mongoose.Schema({
  user: {
      type: mongoose.ObjectId
    },
    time: {
      type: Date,
      default: Date.Now
    }
}));

function validateLogin(login) {

  const schema = {
    userId: Joi.objectId().required(),
    time: Joi.date()
  };
  return Joi.validate(login, schema);
}

exports.Login = Login;
exports.validate = validateLogin;
