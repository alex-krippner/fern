const express = require('express');
const reservationsController = require('./../controllers/reservationsController');
const router = express.Router();

router.route('/').get(reservationsController.getReservations);

module.exports = router;
