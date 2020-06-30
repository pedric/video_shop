const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  isGold: Boolean,
  name: String,
  phone: String
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.string()
  }
  return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;
