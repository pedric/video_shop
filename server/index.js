const winston = require('winston');
const express = require('express');
const debug = require('debug')('app:video_shop');
const app = express();

require('../startup/logging')();
require('../startup/routes')(app);
require('../startup/db')();
require('../startup/config')();
require('../startup/validation')();
require('../startup/prod')(app);

app.set('view engine', 'pug');
app.set('views', './views')

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  debug('Server started');
  winston.info(`listening on http://localhost:${port}`);
});

module.exports = server;
