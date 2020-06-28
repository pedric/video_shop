const mongoose = require('mongoose');
const express = require('express');
const debug = require('debug')('app:video_shop');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');

mongoose.connect('mongodb://localhost/video_shop',{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB.'))
  .catch(err => console.log('ERROR: ', err));

const app = express();
app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/', home);
app.set('view engine', 'pug');
app.set('views', './views')

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Server started');
  console.log(`listening on http://localhost:${port}`);
});
