const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const {User,validate} = require('../../models/user');
const router = express.Router();

// GET
router.get('/', async (req,res) => {
  const users = await User
  .find()
  .sort('userSince');
  res.send(users);
});

router.get('/:id', async (req,res) => {
  const user = User
  .findById(req.params.id)
  res.send(user);
});

// POST
router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email });
  if(user) res.status(400).send('Email already associated to an account');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

// PUT
router.put('/:id', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
  {
    name: req.body.name,
    email: req.body.email,
    password: req.body.email
  }, { new: true });

  if(!user) res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

// DELETE
router.delete('/:id', async (req,res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if(!user) res.status(404).send('No user with that ID found');
  res.send(user);
});

module.exports = router;
