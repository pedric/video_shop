const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
}));

function validateCustomer(customer){
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.string()
  }
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
