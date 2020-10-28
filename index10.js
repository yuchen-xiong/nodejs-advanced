//parallel execution

var fs = require('fs')
var { promisify } = require('util')
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var readdir = promisify(fs.readdir);

var beep = () => process.stdout.write("\x07"); //macOS to beep
var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})

//a single promise to resolve all the promise at one time, inputs are written in an array
//Now all promise are returning a single promise that will invoked when all these promises are resolved
// Promise.all([
//     writeFile('example.md', 'Hello World'),
//     writeFile('example.txt', 'Hello World'),
//     writeFile('example.json', '{ "hello world" }')
// ]).then(() => readdir(__dirname)) //this code will wait for three writeFile resolved before reading the directory and log the results
// .then(console.log);

//remove those files
// Promise.all([
//     unlink('example.md'),
//     unlink('example.txt'),
//     delay(3),
//     unlink('example.json')
// ]).then(() => readdir(__dirname)) //this code will wait for three writeFile resolved before reading the directory and log the results
// .then(console.log);


// Promise.all([
//     delay(5),
//     delay(2),
//     delay(3),
//     delay(5),
// ]).then(() => readdir(__dirname)) //this code will wait for three writeFile resolved before reading the directory and log the results
// .then(console.log);


//Promise.race still creates a single promise, 
// but instead of wating for all the promises to be resolved before the single promise is resolved
//we are only going to wait for the first promise to be resolved, which is delay(2) here
Promise.race([
    delay(5),
    delay(2),
    delay(3),
    delay(5),
]).then(() => readdir(__dirname)) //this code will wait for three writeFile resolved before reading the directory and log the results
.then(console.log);

//promise.all and promise.race give us a way to execute promise in parallel