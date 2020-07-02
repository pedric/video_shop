const config = require('config');

module.exports = function(){
  if(!config.get('PRIVATE_KEY')) {
    throw new Error('FATAL ERROR: PRIVATE_KEY IS NOT DEFINED.');
  }
}
