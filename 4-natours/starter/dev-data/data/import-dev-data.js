const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('DB Connection successful');
    });

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

//IMPORT DATA INTO DB
const importData = async (req, res) => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded.')
    }catch (e) {
        console.log(e);
    }
    process.exit()
}

//DELETE DATA
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log(`Data successfully deleted`);
        process.exit()
    }catch (e) {
        console.log(e);
        
    }
}

if (process.argv[2] === '--import') {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);