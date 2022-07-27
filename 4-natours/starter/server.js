const app = require('./app');

dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is started and running on port, ${PORT}`);
})