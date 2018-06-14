const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = getProfileFields(req);

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        updateProfile(req, res, profileFields);
      } else {
        saveProfile(req, res, profileFields);
      }
    });
});

const getProfileFields = (req) => {
  let profileFields = {};
  profileFields.user = req.user.id;

  // General user info
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.locatione) profileFields.locatione = req.body.locatione;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.github) profileFields.github = req.body.github;

  // Skills
  if (typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',');

  // Social
  profileFields.social = {};
  if (req.body.social) profileFields.social.youtube = req.body.youtube;
  if (req.body.social) profileFields.social.twitter = req.body.twitter;
  if (req.body.social) profileFields.social.facebook = req.body.facebook;
  if (req.body.social) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.social) profileFields.social.instagram = req.body.instagram;

  return profileFields;
};

const updateProfile = (req, res, profileFields) => {
  Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true })
    .then(profile => res.json(profile));
};

const saveProfile = (req, res, profileFields) => {
  Profile.findOne({ handle: profileFields.handle })
    .then(profile => {
      if (profile) {
        const errors = { handle: 'That handle already eists' };
        res.status(400).json(errors);
      } else {
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile));
      }
    });
};

module.exports = router;
