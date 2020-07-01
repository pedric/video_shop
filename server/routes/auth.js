const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const {Auth,validate} = require('../../models/auth');
const {User} = require('../../models/user');
const router = express.Router();

// GET
router.get('/', async (req,res) => {
  const logins = await Auth
  .find()
  .sort('time');
  res.send(logins);
});

router.get('/:id', async (req,res) => {
  const login = Auth
  .findById(req.params.id)
  res.send(login);
});

// POST
router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email });
  if(!user) res.status(400).send('Invalid username or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  res.send(token);
});

// PUT
// router.put('/:id', async (req,res) => {
//   const {error} = validate(req.body);
//   if(error) res.status(400).send(error.details[0].message);
//
//   const user = await User.findByIdAndUpdate(req.params.id,
//   {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.email
//   }, { new: true });
//
//   if(!user) res.status(404).send('The user with the given ID was not found.');
//
//   res.send(user);
// });

// DELETE
router.delete('/:id', async (req,res) => {
  const login = await Login.findByIdAndRemove(req.params.id);
  if(!login) res.status(404).send('No user with that ID found');
  res.send(login);
});

module.exports = router;
