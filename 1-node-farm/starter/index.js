const fs = require("fs");
const http = require("http");
const url = require("url");

/*Reading data from the file*/
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

/*reading and storing templates*/
const templateOverview = fs.readFileSync('./templates/templateOverview.html', 'utf-8');
const templateProduct = fs.readFileSync('./templates/templateProduct.html', 'utf-8');
const templateCard = fs.readFileSync('./templates/templateCard.html', 'utf-8');

/*replaces template placeholders with product data*/
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

    return output;
};

/*Creates the server*/
const server = http.createServer((req, res) => {
    console.log(req.url);
    // const pathname = req.url;
    const {query, pathname} = url.parse(req.url, true)
    console.log(url.parse(req.url, true));

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }else if (pathname === '/product') {
        res.end('This is our product page');
    } else if(pathname === '/api') {
        res.end(data);
    } else {
        res.end('Path is not found');
    }
});

server.listen(8000 ,'127.0.0.1', ()=>{
    console.log(`Server has started 8000`);
});





