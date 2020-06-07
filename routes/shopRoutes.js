const express = require('express');
const shopController = require('./../controllers/shopController');
const router = express.Router();

router.route('/').get(shopController.getShop);

module.exports = router;
