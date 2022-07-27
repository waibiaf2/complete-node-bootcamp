const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    if (val * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: 'Invalid ID'
        })
    }
    
    next();
};

exports.checkBody = (req, res) => {
    if(!req.body.name || req.body.regPrice) {
        req.status(402).json({
            status: 'Failed',
            message : 'Missing name or price'
        })
    }
}
    
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requests: tours.length,
        data: {
            tours
        }
    })
};

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

exports.updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'Failed',
            message: 'Invalid ID'
        })
    }
    console.log(`The tour has been patched`);
    res.status(204).json({
        status: 'Success',
        data: {
            message: '<Tour has been updated>...'
        }
    })
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'Success',
        data: null
    })
    
};
