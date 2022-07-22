const express = require('express');
const fs = require('fs');

const app = express();

const route = express.Router;

const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`);

/*Middleware.
**************************************************************/
app.use(express.json());



/*Routes
*************************************************************/
route('/').get(()=>{
    console.log(`This is the root path for tours`);
})
