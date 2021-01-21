const express = require('express');

const cartController = require('../controllers/cartController.js');

const router = express.Router();

router.route('/checkout-session').get(cartController.getCheckoutSession);

module.exports = router;
