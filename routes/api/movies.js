const router = require('express').Router();
const Movie = require('../../models/Movie');
const Actor = require('../../models/Actor');
const auth = require('../../auth');

// @Route   GET api/movies
// @desc    Get all movies
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const movie = await Movie.find()
    res.status(201).send(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/movies
// @desc    post movies
// @access  Private

router.post('/', async (req, res) => {
  const { title, year, rating } = req.body
  movie = new movie({
    movies: [{
      title,year,rating
  }]
  })
  try {
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
