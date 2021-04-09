var express = require('express');
var router = express.Router();
const dataController = require('../controllers/data.controller');

/* GET users listing. */
// router.get('/', userController.getAllUser);
router.post('/', dataController.createData);
router.get('/', dataController.getAllData);


module.exports = router;
