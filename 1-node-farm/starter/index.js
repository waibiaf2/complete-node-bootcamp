const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////////////////
/////////////Files

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

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

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === 'overview') {
        res.end('This is an overview');
    }else if (pathName === 'product') {
        res.end('This is a PRODUCT');
    }else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
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
