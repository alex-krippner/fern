const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router
  .route('/products')
  .get(shopController.getAllProducts)
  .post(shopController.createProduct);

router
  .route('/products/:id')
  .get(shopController.getProduct)
  .post(shopController.addProductToCart);

router.route('/cart').get(shopController.getAllCartItems);

router.route('/cart/:id').get(shopController.getCartItem);

module.exports = router;
