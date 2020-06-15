const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router
  .route('/products')
  .get(shopController.getAllProducts)
  .post(shopController.createProduct);

router.route('/products/:id').get(shopController.getProduct);

module.exports = router;
