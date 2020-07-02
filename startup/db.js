const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
  mongoose.connect('mongodb://localhost/video_shop',{ useUnifiedTopology: true,useNewUrlParser: true })
    .then(() => winston.info('Connected to mongoDB.'));
}
