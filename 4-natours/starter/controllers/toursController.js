const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req,res)=> {
    res.status(200).json({
        status: 'success',
        requests: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {
    //console.log(tours);
    const curId = req.params.id * 1;
    console.log(curId);
    const tour = tours.find(el => el.id === curId);
    console.log(tour);
    
    if (!tour) {
        res.status(404).json({
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

exports.postTour = (req,res) => {
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    console.log(newTour);
    
    tours.push(newTour);
    
    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    })
}
