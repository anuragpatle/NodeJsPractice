//---
// Synchronous way to read and write file
const fs = require('fs');
const textIn = fs.readFileSync('./txt/MyFile.txt', 'utf-8');

console.log(textIn);

//Using back ticks is new ES6 syntax
const textOut = `This is what we know about grapes: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);

console.log('File written!');


// Non-blocking / asynchronous way 
fs.readFile('./txt/start.txt', 'utf-8', (err, startFileName) => {
    fs.readFile(`./txt/${startFileName}.txt`, 'utf-8', (err, dataInsideFile) => {
        console.log(dataInsideFile)
    })
});

console.log('will read file!');
//---

