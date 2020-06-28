const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {Customer, validate } = require('../../models/customer');

// GET
router.get('/', async (req,res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req,res) => {
  let customer = await Customer.findById(req.params.id);
  if(!customer) return res.status(404).send('No customer found on given ID.');
  res.send(customer);
});

// POST
router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });
  customer = await customer.save();
  res.send(customer);
});

// PUT
router.put('/:id', async (req,res) => {
  console.log('PUT: ', req.body)
  const {error} = validate(req.body);
  if(error) res.status(400).res.send(error.details[0].message);
  const details = {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  };
  const customer = await Customer.findByIdAndUpdate(req.params.id, details, { new: true });
  if(!customer) res.status(404).send('No customer with that ID found');
  res.send(customer);
});

// DELETE
router.delete('/:id', async (req,res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if(!customer) res.status(404).send('No customer with that ID found');
  res.send(customer);
});

module.exports = router;
