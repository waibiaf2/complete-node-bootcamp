const express = require('express');

const toursController = require('../controllers/toursController');

const router = express.Router();

/*Routes
*************************************************************/
router
    .route('/')
    .get(toursController.getAllTours);
