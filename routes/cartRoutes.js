const express = require('express');

const cartController = require('../controllers/cartController.js');

const router = express.Router();

router.get('/checkout-session', cartController.getCheckoutSession);

module.exports = router;
