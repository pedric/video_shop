const bcrypt = require('bcrypt');

async function generateSalt(password){
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

generateSalt('pass1234').then(result => { console.log(result); })
