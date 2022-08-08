const Tour = require('../models/tourModel');
const APIFeatures = require('./../uitls/APIFeatures');

exports.top5CheapTours = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.limit = 5;
  req.query.fields = 'name,price, ratingsAverage,summary,difficulty';
  
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   console.log(`There are ${numTours / page} pages`);
    //   if (skip >= numTours) throw new Error('The page does not exist');
    // }
    
    //Excute Query
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sortResults()
        .paginate()
        .limitFields();
  
    const tours = await features.query;
    //console.log(tours);

    res.status(200).json({
      status: 'success',
      requests: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(204).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e,
    });
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
