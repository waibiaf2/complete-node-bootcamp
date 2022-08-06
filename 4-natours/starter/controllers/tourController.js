const Tour = require('../models/tourModel');
const { query } = require('express');

exports.getAllTours = async (req, res) => {
    try {
        
        // 1) Filtering
        // a)Basic Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        
        // b) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));
        
        // Adds a query object into the find method of mongoose
        let query = Tour.find(JSON.parse(queryStr));
        
        // 2) Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }
    
        // 3) Fields.
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }
        
        //4) Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
    
        query = query.skip(skip).limit(limit);
    
        if (req.query.page) {
            const numTours = await Tours.countDocuments();
            if( skip >= numTours)
                throw new Error('This page does not exist');
        }
        
        const tours = await query;
        //console.log(tours);
        
        res.status(200).json({
            status: 'success',
            requestTime: req.requestTime,
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

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
