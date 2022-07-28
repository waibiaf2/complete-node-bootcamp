const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is started and running on port, ${PORT}`);
})