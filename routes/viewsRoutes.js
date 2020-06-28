const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.route('/').get(viewsController.getHome);

router.route('/about').get(viewsController.getAbout);
router.route('/contact').get(viewsController.getContact);
router.route('/dinner').get(viewsController.getDinner);
router.route('/reservations').get(viewsController.getReservations);
// router.route('/shop').get(viewsController.getShop);
router.route('/wanderlust').get(viewsController.getWanderlust);

module.exports = router;
