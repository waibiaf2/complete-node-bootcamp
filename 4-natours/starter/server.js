const app = require('./app');

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is started and running on port, ${PORT}`);
})