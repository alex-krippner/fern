const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router
  .route('/products')
  .get(shopController.getAllProducts)
  .post(shopController.createProduct);

router.get('/add-to-cart/:id', shopController.addToCart);

router.get('/shopping-cart', shopController.getShoppingCart);

router.route('/products/:id').get(shopController.getProduct);

router.route('/cart').get(shopController.getAllCartItems);

module.exports = router;

// the end point is localhost:8000/shop/:userId/carts
// router.use('/:userId/carts', cartRouter);

// router.route('/:userId/cart').post(shopController.createCart);

// function (req, res, next) {
//   const productId = req.params.id;
//   const cart = new Cart(req.session.cart ? req.session.cart : {});

//   Product.findById(productId, function (err, product) {
//     if (err) {
//       return res.redirect('/');
//     }
//     cart.add(product, productId);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/');
//   });
// });

// //  TODO: patch request should only change the amount
// router
//   .route('/cart/:id')
//   .get(shopController.getCartItem)
//   .patch(shopController.increaseCartItemAmount)
//   .delete(shopController.removeCartItem);
