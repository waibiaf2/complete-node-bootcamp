const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.getAllTours = (res,req)=> {
    res.status(200).json({
        status: success,
        data: {
            tours
        }
    })
}
