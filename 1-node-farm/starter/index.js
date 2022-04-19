const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require('./modules/replaceTemplate');

/*Reading data from the file*/
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

/*reading and storing templates*/
const templateOverview = fs.readFileSync('./templates/templateOverview.html', 'utf-8');
const templateProduct = fs.readFileSync('./templates/templateProduct.html', 'utf-8');
const templateCard = fs.readFileSync('./templates/templateCard.html', 'utf-8');


/*Creates the server*/
const server = http.createServer((req, res) => {
    console.log(req.url);
    // const pathname = req.url;
    const {query, pathname} = url.parse(req.url, true)
    //console.log(url.parse(req.url, true));

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        let output = replaceTemplate(templateProduct, product);
        res.end(output);
    } else if(pathname === '/api') {
        res.end(data);
    } else {
        res.end('Path is not found');
    }
});

server.listen(8000 ,'127.0.0.1', ()=>{
    console.log(`Server has started 8000`);
});





