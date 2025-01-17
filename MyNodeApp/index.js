const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')


/////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

/////////////////////////////////
// SERVER



const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const products = JSON.parse(data);

const server = http.createServer((req, res) => {
 
  // In order to parse query into an object we pass 'ture' here
  // What is query?
  // Ans. /product?id=2. In this example "id=2" is query query string.
  const {query, pathname} = url.parse(req.url, true);
  
  console.log(query);
  console.log(pathname);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
  
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    
    // What join('') will do is it will return the result into a single string. 
    // Without join('') we will get an arry of data.
    const cardsHtml = products.map(product => replaceTemplate(templateCard, product)).join('');
    
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    
    res.end(output);

    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    
    const selectedProduct = products[query.id];
    const output = replaceTemplate(tempProduct, selectedProduct);

    res.end(output);

  // Api
  } else if (pathname === '/api') {
    
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
      
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
