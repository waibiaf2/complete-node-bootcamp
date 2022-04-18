//Native module imports
const fs = require('fs');
const http = require('http');
const url = require('url');

//Custom module imports
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////////////////
/////// Files

//Blocking, synchronous way
/*const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about the ovacado: ${textIn}.\nCreatead on ${Date.now()}`;
fs.writeFileSync('./txt/output2.txt', textOut);
console.log('File written');*/

//Non Blocking, Synchronous way
// fs.readFile('./txt/start.txt', 'utf-8',    (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8',    (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8',    (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your File has been written');
//             });
//         });
//     });
// });

/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./txt/final_waibi.txt', `${data2}\m${data3}`, err => {
                console.log('Your file has been written');
            });
        });
    });
});

console.log('Will read file');*/

///////////////////////////////////////////////////////////////
// Server

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     const pathName = req.url;
//     if (pathName === '/' || pathName === '/overview') {
//         res.end('This is the OVERVIEW');
//     }else if (pathName === '/product') {
//         res.end('This is the PRODUCT');
//     }else {
//         res.writeHead(404, {
//             'Content-type': 'text/html',
//             'my-own-header': 'hello-world'
//         });
//         res.end('<h1>This page could not be found</h1>');
//     }
// });

//Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//Data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


//Creates nodejs server
const server = http.createServer((req, res) => {
   const {query, pathname} = url.parse(req.url, true);

    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200,{'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    //Product Page
    }else if (pathname === '/product') {

        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        output = replaceTemplate(tempProduct, product)
        res.end(output);

    //API
    }else if (pathname === '/api') {

        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);

    //NOT FOUND
    } else {

        res.writeHead('404', {
            'Content-type': 'text/html',
            'my-custom-header': 'Hello World'
        });
        res.end('Page not found');

    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server started on port 8000');
});
