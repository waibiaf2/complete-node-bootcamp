const express = require('express');

const router = express.Router();

const toursController = require('../controllers/toursController');

// router.param('id', toursController.checkID);
/*
 ** Routes
 *************************************************************/
router
  .route('/top-5-cheap')
  .get(toursController.top5CheapTours, toursController.getAllTours);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
