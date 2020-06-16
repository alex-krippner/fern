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

//  TODO: patch request should only change the amount
router
  .route('/cart/:id')
  .get(shopController.getCartItem)
  .patch(shopController.increaseCartItemAmount)
  .delete(shopController.removeCartItem);

module.exports = router;
