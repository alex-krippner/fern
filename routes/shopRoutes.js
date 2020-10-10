const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/add-to-cart/:id', shopController.addToCart);

router
  .route('/shopping-cart')
  .get(shopController.getShoppingCart)
  .patch(shopController.updateQuantity);

router.route('/shopping-cart/remove-item').patch(shopController.removeItem);

module.exports = router;
