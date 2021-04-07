var mongoose = require('mongoose');
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Role = require('../_helper/role');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

// exports.createUser = (req, res) => {
//   const user = new User({
//     _id: mongoose.Types.ObjectId(),
//     name: req.body.name,
//     picture: req.body.picture,
//   });
//   return user
//     .save()
//     .then((newUser) => {
//       return res.status(201).json({
//         success: true,
//         message: 'New User created successfully',
//         user: newUser,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again.',
//         error: error.message,
//       });
//     });
// } 

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

exports.authenticate = async (req, res ) => {
  const username = req.body.username;
  const password = req.body.password;
  try{
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: '7d' });
        return res.json( {
          ...user.toJSON(),
          token
      });
    }
    else if(!user){
      throw new Error('User not found');
    }
    else{
      throw new Error('Check credentails again');
    }
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
      });
  }
}

exports.getById = async function(req, res) {
  try{
    user = await User.findById(req.params.id);

    if(user){
     res.json(user);
    }
    else{
      throw Error('User not found')
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
      });
  }

}

exports.create =  async function(req, res) {
  const  userParam = req.body;
  const user = new User(userParam);
  if (userParam.password) {
      user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  try{
    await user.save()
    res.json("User Saved");
  }
  catch( err){
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(500).send({ succes: false, message: 'User already exist!' });
      }
    };
    res.status(500).json({
      success: false,
      message: err.message
      })
    };
}

exports.update = async function(req, res){
  try{
    const userParam = req.body;
    const user = await User.findById(req.params.id);
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
      throw 'Username "' + userParam.username + '" is already taken';
    }
    
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    res.status(200).json({
      message: 'User updated'
    })
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: err.message
      });
  }
}

exports.delete = async function(req, res) {
  const id = req.params.id;
    User.findByIdAndRemove(id).then(data => {
      res.json(data);
    }).catch(err =>{ throw new Error(err.message)});
}

// exports.getCurrent = async function (req, res){
//   try{
//     getById(req.user.sub)
//   }
//   catch(err){
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: err.message
//       });
//   }
// }