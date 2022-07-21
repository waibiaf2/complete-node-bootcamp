const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

/*Route Handlers
* *****************************************************/
exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not yet definede'
    })
}


exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not yet defined'
    })
}

exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not yet defined'
    })
}

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not yet defined'
    })
}

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'Error',
        message: 'This route is not yet definede'
    })
}