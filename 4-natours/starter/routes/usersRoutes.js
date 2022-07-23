const express = require('express');
const userController = require('./../controllers/usersController');

const app = express();

const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers);

router
    .route('/:id')
    .get(userController.getUser);

module.exports = router;
