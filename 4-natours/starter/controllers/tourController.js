const { query } = require('express');
const Tour = require('../models/tourModel');
const APIFeatures = require('./../utils/APIFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price, ratingsAverage,summary,difficulty';
  
  next();
};



exports.getAllTours = async (req, res) => {
  try {
    // if (this.queryString.page) {
    //   const numTours = await this.query.countDocuments();
    //   if (skip >= numTours) {
    //     throw new Error('This page does not exist');
    //   }
    // }
  
    //EXCUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sortResults()
        .limitFields()
        .paginate();
    
    // const tours = await features.query;
    const tours = await  features.query;
    console.log(tours);
    
    res.status(200).json({
      status: 'success',
      requestTime: req.requestTime,
      results: tours.length,
      data: {
        tours
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

    

exports.getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  try {
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
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e,
    });
  }
};
