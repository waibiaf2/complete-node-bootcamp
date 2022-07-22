const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)

exports.getAllTours = (res,req)=> {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
}

exports.getTour = (res, req) => {
    const curId = tours[tours.length - 1].id + 1;
    const tour = tours.find(el => id === curId);
    
    if (!tours) {
        res.status(204).json({
            status: 'failed',
            message: 'Invalid Id'
        });
    }
    
    res.status(200).json({
        status:'success',
        data: {
            tour
        }
    })
}
