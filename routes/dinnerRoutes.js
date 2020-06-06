const express = require('express');
const dinnerController = require('./../controllers/dinnerController');
const router = express.Router();

router.route('/').get(dinnerController.getDinner);

module.exports = router;
