var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controllers');
const authorize = require('../_helper/authorize');
const Role = require('../_helper/role');

/* GET users listing. */
router.get('/', authorize(Role.Admin),  userController.getAllUser);
router.post('/', userController.create);
router.post('/authenticate',  userController.authenticate);
router.get('/:id', authorize([Role.Admin, Role.User]), userController.getById);
router.put('/:id', authorize([Role.Admin, Role.User]), userController.update);
router.delete('/:id', authorize([Role.Admin, Role.User]), userController.delete)

module.exports = router;
