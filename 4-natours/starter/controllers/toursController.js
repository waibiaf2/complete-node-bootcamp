const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (res,req)=> {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
}

exports.getTour = (res, req) => {
    //console.log(tours);
    const curId = req.params.id * 1;
    console.log(curId);
    const tour = tours.find(el => el.id === curId);
    console.log(tour);
    
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