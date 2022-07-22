const express = require('express');
const fs = require('fs');

const toursController = require('../controllers/toursController');

const app = express();

const router = express.Router;

const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`);

/*Middleware.
**************************************************************/
app.use(express.json());



/*Routes
*************************************************************/
router
    .route('/')
    .get((res,req)=>{
        res.json({
            status: sucess,
            data: {
                tours:tours
            }
        })
    })
