const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');

// Profile model
const Profile = require('../../models/Profile');

// Load post validation
const validatePost = require('../../validation/post');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ postNotFound: 'Posts not found' }));
});

// @route   DELETE api/post/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: 'User not authorized to delete this post' });
        }
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postNotFound: 'Post not found' }));
    });
});

// @route   GET api/posts/:id
// @desc    Get posts
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ postNotFound: 'Post not found' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePost(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

module.exports = router;
