const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

router.get('/me', auth, async (req,res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// POST
router.post('/', auth, async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email });
  if(user) res.status(400).send('Email already associated to an account');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// PUT
router.put('/:id', auth, async (req,res) => {
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
router.delete('/:id', auth, async (req,res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if(!user) res.status(404).send('No user with that ID found');
  res.send(user);
});

module.exports = router;
