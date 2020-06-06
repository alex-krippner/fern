const express = require('express');
const wanderlustController = require('./../controllers/wanderlustController');
const router = express.Router();

router.route('/').get(wanderlustController.getWanderlust);

module.exports = router;
