var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');

/* GET users listing. */
router.get('/', userController.getAllUser);
router.post('/', userController.createUser);



module.exports = router;
