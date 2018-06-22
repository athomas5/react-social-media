const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors = { noprofile: 'There is no profile for this user handle' };
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors = { noprofile: 'There is no profile for this user id' };
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(400).json({ noprofile: 'There is no profile for this user' }));
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    }).catch(err => res.status(404).json({ noprofiles: 'There are no profiles' }));
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
        saveNewProfile(req, res, profileFields);
      }
    });
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to experience array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
});

// @route   POST api/profile/education
// @desc    Add experience to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofStudy: req.body.fieldofStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to experience array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    profile.experience = profile.experience.filter(experienceObj => {
      return experienceObj._id.toString() !== req.params.exp_id;
    });

    profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      profile.education = profile.education.filter(educationObj => {
        return educationObj._id.toString() !== req.params.edu_id;
      });

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: 'User has been deleted' }));
    }).catch(err => res.json(err));
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

const saveNewProfile = (req, res, profileFields) => {
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
