const mongoose = require('mongoose');
const Actor = require('./Actor');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movies: [
    {
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
      actors: [
        {
          type: Schema.Types.ObjectId,
          ref: 'actor'
        }
      ]
    }
  ]
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
