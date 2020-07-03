const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
  mongoose.connect(config.get('DATABASE'),{ useUnifiedTopology: true,useNewUrlParser: true })
    .then(() => winston.info(`Connected to ${config.get('DATABASE')}`));
}
