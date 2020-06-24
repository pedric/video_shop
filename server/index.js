const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');

const app = express();
app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
