const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    
    console.log(req.url);
    
    const pathName = req.url;
    
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    } else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        
        // We have set content-type as html. So, now we can send html inside the res.end(..)
        res.end('<h1>Page not found!</h1>');
    }
    
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the requests on the port 8000');
});