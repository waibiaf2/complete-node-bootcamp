const express = require('express');
const morgan = require('morgan');

const app = express();

/*Middleware
***********************************************************/
app.use(morgan('dev'))

app.use('/api/v1/tours', ()=>{
    console.log(`route mounted successfully`);
})







module.exports = app;