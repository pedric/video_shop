const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',
{useUnifiedTopology: true,useNewUrlParser: true})
.then(() => console.log('Connected to DB'))
.catch(err => console.log('ERROR: ', err));

const Pet = mongoose.model('Pet', new mongoose.Schema({
  name: String,
  type: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
}));

const Owner = mongoose.model('Owner', new mongoose.Schema({
  name: String,
  phone: String
}));

async function createPet(petName, petType, ownerId){
  const pet = new Pet({
    name: petName,
    type: petType,
    owner: Owner
  });

  const result = await pet.save();
  console.log(result);
}

// createPet('Siri','dog', '5ef995a0b0679357e15f472b');

// async function  createOwner(name,phone){
//     const owner = new Owner({
//       name: name,
//       phone: phone
//     });
//
//     const result = await owner.save();
//     console.log(result);
// }

// createOwner('Pedric', '896768');

async function  createPetByEmbed(name,phone){
    const owner = new Owner({
      name: name,
      phone: phone
    });

    const result = await owner.save();
    console.log(result);
}

// createPetByEmbed();

async function listVetClients(){
  const pets = await Pet
    .find()
    .populate('owner', 'name -_id')
    .select('name owner');

    console.log(pets);
}

// listVetClients();
