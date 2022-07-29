const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
      useNewUrlParser: true,
    }).then(() => {
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

module.exports = Tour;