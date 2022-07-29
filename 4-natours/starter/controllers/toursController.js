const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find();

        res.status(200).json({
            status: 'success',
            requests: tours.length,
            data: {
                tours
            }
        });
    }catch (e) {
        res.status(404).json({
            status: 'fail',
            message: e,
        })
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                tour
            }
        })
    }catch (e) {
        res.status(404).json({
            status: 'fail',
            message: e
        })
    }
 
}

exports.createTour = async (req,res) => {
   try {
       const newTour = await Tour.create(req.body);
       res.status(201).json({
           status: 'success',
           data: {
               tour: newTour
           }
       })
   } catch (e) {
       res.status(404).json({
           status: 'fail',
           message: e
       })
   }
}

exports.updateTour = (req, res) => {
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
