const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');



const testTour = new Tour({
    name: 'The Park Camper',
    price: 997
});

testTour.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('ERROR 🎶🎶🎶🎶', err);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App runnig on port ${PORT}...`);
});
