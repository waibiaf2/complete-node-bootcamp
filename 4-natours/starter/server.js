const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { mongo } = require('mongoose');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: true
  }).then(() =>{
    console.log(`Connection Successful`);
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour name must be unique'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

const Tour = new mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name: 'Kabale Industrial Park Tour',
    price: 556,
});

testTour.save()
  .then(doc =>{
      console.log(doc);
  });



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is started and running on port, ${PORT}`);
})