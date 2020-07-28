const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.route('/').get(viewsController.getHome);
router.route('/dinnerpug').get(viewsController.getDinnerPug);

router.route('/about').get(viewsController.getAbout);
router.route('/contact').get(viewsController.getContact);
router.route('/dinner').get(viewsController.getDinner);
router.route('/shop').get(viewsController.getShop);
router.route('/checkout').get(viewsController.getCheckout);
router.route('/wanderlust').get(viewsController.getWanderlust);

module.exports = router;
