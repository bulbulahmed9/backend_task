const router = require('express').Router();
const mongoose = require('mongoose');
const Actor = require('../../models/Actor');

// @Route   GET api/actors
// @desc    Get all actors
// @access  Public

router.get('/', async (req, res) => {
  try {
    const actor = await Actor.find();
    res.send(actor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @Route   POST api/actors
// @desc    post actors
// @access  Public

router.post('/', async (req, res) => {
  const { name, birthday, country } = req.body;
  actor = new Actor({ name, birthday, country });
  try {
    await actor.save();
    res.send("Actor added to the database");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
