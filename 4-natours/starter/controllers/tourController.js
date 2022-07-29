const fs = require('fs');
const Tour = require('./../models/tourModel');


exports.getAllTours = async (req, res) => {
   try{
       const tours = await Tour.find();
    
       res.status(200).json({
           status: 'success',
           requestTime: req.requestTime,
           results: tours.length,
           data: {
               tours
           }
       });
   }catch(err){
       res.status(404).json({
           status: 'fail',
           message: err
       })
   }
}

exports.getTour = async (req,res)=> {
    const tour = await Tour.findById(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
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

exports.createTour = async  (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
    
        res.status(201).json({
            status:'Success',
            data: {
                tour: newTour
            }
        })
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message:'Invalid data sent!',
        })
    }
}

exports.patchTour = (req,res) =>{
    res.status(200).json({
        status:'success',
        data: {
            tour: '<Updated tour here....>',
        }
    });
}

exports.deleteTour = (req,res) =>{
    res.status(204).json({
        status:'success',
        data: null
    });
}

