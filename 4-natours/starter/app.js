const express = require('express');
const morgan = require('morgan');

const toursRoutes = require('./routes/toursRoute');

const app = express();

/*Middleware
***********************************************************/
app.use(morgan('dev'))

app.use('/api/v1/tours', toursRoutes);







module.exports = app;