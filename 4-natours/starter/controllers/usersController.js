const fs = require('fs')
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
)
console.log(users);

exports.getAllUsers = (req,res) => {
    res.status(200).json({
        status: 'success',
        data : {
            users
        }
    })
}

exports.getUser = (req,res) => {
    const id = req.params.id * 1;
    const user = users.find(user => user.id === id);
    
    if(!user) {
        res.status(404).json({
            status: 'Failed',
            message: 'Invlid ID'
        }
    )}
    
    res.status(200).json({
        status:'Success',
        data: {
            user
        }
    })
}