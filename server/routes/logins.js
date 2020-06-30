const express = require('express');
const mongoose = require('mongoose');
const {Login,validate} = require('../../models/login');
const router = express.Router();

// GET
router.get('/', async (req,res) => {
  const logins = await Login
  .find()
  .sort('time');
  res.send(logins);
});

router.get('/:id', async (req,res) => {
  const login = Login
  .findById(req.params.id)
  res.send(login);
});

// POST
router.post('/', async (req,res) => {
  const {error} = validate(req.body);
  if(error) res.status(400).send(error.details[0].message)

  const login = new Login({
    user: req.body.userId,
    time: req.body.time
  });

  await login.save();
  res.send(login);
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
