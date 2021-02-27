var mongoose = require('mongoose');
const User = require('../models/users.model');

exports.createUser = (req, res) => {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    picture: req.body.picture,
  });
  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: 'New User created successfully',
        user: newUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
} 


exports.getAllUser = (req, res) => {
    User.find({})
      .then((allUser) => {
        return res.status(200).json(allUser);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: err.message,
        });
      });
  };