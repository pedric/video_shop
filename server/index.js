const winston = require('winston');
const express = require('express');
const debug = require('debug')('app:video_shop');
const app = express();

require('../startup/logging')();
require('../startup/routes')(app);
require('../startup/db')();
require('../startup/config')();
require('../startup/validation')();

app.set('view engine', 'pug');
app.set('views', './views')

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('Server started');
  winston.info(`listening on http://localhost:${port}`);
});
