const express = require('express');
const morgan = require('morgan');

const app = express();

const toursRoute = require('./routes/toursRoute');



/*Middleware
***********************************************************/
app.use(morgan('dev'));

app.use('/api/v1/tours', toursRoute);



module.exports = app;