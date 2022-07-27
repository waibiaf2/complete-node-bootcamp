const express = require('express');
const morgan = require('morgan');

const app = express();

const toursRoute = require('./routes/toursRoute');
const userRoute = require('./routes/usersRoutes');



/*
Middleware
***********************************************************/
if (NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tours', toursRoute);
app.use('/api/v1/users', userRoute);




module.exports = app;