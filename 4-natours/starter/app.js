const fs = require('fs');
const express = require('express');

const app = express()

app.use(express.json());

//
// app.get('/', (req,res)=>{
//     res
//         .status(200)
//         .json({
//             message:'Hello from server side!',
//             app: 'Natours'
//         });
//
//     console.log(res);
// });
//
// app.post('/', (req,res) => {
//     res.send('You can post to this endpoint....');
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Call Back functions OR Handlers
const getTours = (req,res)=>{
    res.status(200).json({
        status: 'success',
        results:tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req,res)=>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}


const postTour =  (req, res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id +1;
    const newTour = Object.assign({id:newId}, req.body);
    
    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status:'Success',
            data: {
                tour: newTour
            }
        })
    })
    // res.send(`Done`);
}

const patchTour = (req,res) =>{
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Tour doesnt exist or invalid ID'
        })
    }
    res.status(200).json({
        status:'success',
        data: {
            tour: '<Updated tour here....>',
        }
    });
}

const deleteTour = (req,res) =>{
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status:'success',
        data: null
    });
}

//Routes
/*
app.get('/api/v1/tours', getTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', postTour);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id', delteTour);
*/
app.route('/api/v1/tours')
    .get(getTours)
    .post(postTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(patchTour)
    .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App runnig on port ${PORT}...`);
});

