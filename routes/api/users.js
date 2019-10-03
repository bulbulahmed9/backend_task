const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../../models/User');

// @Route   POST api/user/signup
// @desc    Register User
// @access  Public

router.post(
  '/signup',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      user = new User({
        username,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsonwebtoken
      const payload = {
        id: user.id
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '2h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @Route   POST api/user/login
// @Desc    Login user
// @Access  Public

router.post(
  '/login',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Password is required'
    ).not().isEmpty()
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not found!' }] });
      }

      

      // Decrypt password
      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        res.status(400).json({ msg: 'Invalid password!' })
      }

      // return jsonwebtoken
      const payload = {
        id: user.id
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '2h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
