const express = require('express');

const toursController = require('./../controllers/toursController');

const router = express.Router();

router.param('id', toursController.checkID);

/*Routes
*************************************************************/
router
    .route('/')
    .get(toursController.getAllTours)
    .post(toursController.checkBody, toursController.postTour);

router
    .route('/:id')
    .get(toursController.getTour)
    .patch(toursController.updateTour)
    .delete(toursController.deleteTour);


module.exports = router;