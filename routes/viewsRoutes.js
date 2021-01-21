const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).redirect('/home');
});

router.route('/home').get(viewsController.getHome);
router.route('/dinner').get(viewsController.getDinner);
router.route('/wanderlust').get(viewsController.getWanderlust);
router.route('/about').get(viewsController.getAbout);
router.route('/shop').get(viewsController.getShop);
router.route('/contact').get(viewsController.getContact);
router.route('/checkout').get(viewsController.getCheckout);
router
  .route('/payment-confirmation/:sessionId')
  .get(viewsController.getPaymentConfirmation);

module.exports = router;
