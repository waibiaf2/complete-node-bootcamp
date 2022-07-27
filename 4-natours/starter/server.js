const app = require('./app');
const config_env = require('./config.env')

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is started and running on port, ${PORT}`);
})