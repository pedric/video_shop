const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
  },
  isAdmin: { Boolean, default: false }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('PRIVATE_KEY'));
  return token;
}

const User = mongoose.model('User', userSchema);



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
