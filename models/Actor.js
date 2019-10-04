const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  country: {
    type: String
  }
});

module.exports = Actor = mongoose.model('Actor', ActorSchema);
