const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  actors: [
    {
      name: {
        type: String,
        required: true
      },
      birthday: {
        type: String
      },
      country: {
        type: String
      }
    }
  ]
});

module.exports = Actor = mongoose.model('actor', ActorSchema);
