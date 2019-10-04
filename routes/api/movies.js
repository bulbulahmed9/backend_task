const router = require('express').Router();
const Movie = require('../../models/Movie');
const Actor = require('../../models/Actor');
const auth = require('../../auth');
const mongoose = require('mongoose');

// @Route   GET api/movies
// @desc    Get all movies
// @access  Private

router.get('/', async (req, res) => {
  // try {
  //   await Movie.findOne({ title: 'ek tha tiger' }).populate('actors').exec((err, data) => {
  //     console.log(data)
  //   })
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server Error');
  // }
  Movie.findOne({ title: 'Hello' })
    .populate('actors')
    .then(data => console.log(data))
    .catch(err => console.log(err));
});

// @Route   POST api/movies
// @desc    post movies
// @access  Private

router.post('/', async (req, res) => {
  const { title, year, rating, actors } = req.body;
  const actorsName = actors.split(',');
  const actoresPromises = actorsName.map(actor =>
    Actor.findOne({ name: RegExp(actor.trim(),'i') },"_id")
  );
  let actorsArray = await Promise.all(actoresPromises);
  actorsArray = actorsArray.filter(actor=>actor !==null);
  
  movie = new Movie({ title, year, rating, actors: actorsArray });
  try {
    await movie.save();
    res.send('Movie added to the database');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
