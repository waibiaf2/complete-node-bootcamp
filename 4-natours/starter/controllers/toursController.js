const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //1) Filtering
    //create a copoy of the query object
    const queryObj = { ...req.query };

    //an array of items to be excluded from the query if they exist
    const excludedItems = ['page', 'fields', 'sort', 'limit'];
    excludedItems.forEach((el) => delete queryObj[el]);

    let queryStr = queryObj.split(',').join(' ');

    let query = Tour.find(queryObj);
    console.log(queryObj);
    console.log(query);

    //2) Sorting

    //3)Fields

    //4) Pagination

    const tours = await query;

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
