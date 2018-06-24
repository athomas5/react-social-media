const express = require("express");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

const User = require('../../models/User');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users/login
// @desc    Login user / Retur JWT
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      } 
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            handleJwt(res, user);
          } else {
            errors.password = 'Incorrect Password';
            return res.status(400).json(errors);
          }
        })
    });
});

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = createAvatar(req);
        const newUser = createUser(req, avatar);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err };
            newUser.password =  hash;
            saveUserToDB(res, newUser);
          });
        });
      }
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

const createUser = (req, avatar) => (
  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar
  })
);

const createAvatar = req => (
  gravatar.url(req.body.email, {
    size: 200,
    rating: 'pg',
    default: 'mm'
  })
);

const saveUserToDB = (res, newUser) => {
  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
}

const handleJwt = (res, { id, name, avatar }) => {
  const payload = { id, name, avatar };

  jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
    res.json({
      success: true,
      token: 'Bearer ' + token
    });
  });
};

module.exports = router;