const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  rating: {
    type: String
  },
  actors: [{ type: Schema.Types.ObjectId, ref: 'Actor', required: true }]
  
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
