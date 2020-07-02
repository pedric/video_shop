require('express-async-errors');
const winston = require('winston');

module.exports = function(){
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  process.on('unhandledRejection', (err) => {
    throw err;
  });
}
