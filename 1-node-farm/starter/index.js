const fs = require("fs");
const http = require("http");
const url = require("url");

/*Reading data from the file*/
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {
    console.log(req.uri);


    if (pathname === '/' || pathname === '/overview') {
        res.end('This is an overview');
    }else if (pathname === '/product') {
        res.end('This is our product page');
    } else {
        res.end('Page not found');
    }
});

server.listen(8000 ,'127.0.0.1', ()=>{
    console.log(`Server has started 8000`);
});





