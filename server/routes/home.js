const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('index', {message:'hello world!',title:'site title'});
})

module.exports = router;
