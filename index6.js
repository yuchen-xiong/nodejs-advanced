var fs = require('fs'); //our file system module, all the functions use callback
//promisify turns callback functions to promise and make them easier to use
var { promisify } = require('util');

//The errors that occurin the writefile are passed at the 1st argument to the callback
//and if any errors do not occur, any data is passed to the 3rd, 4th argument to the callback
//this promisify utility will know how to automatically convert that write file function into a promise
var writeFile = promisify(fs.writeFile);

writeFile('sample.txt', 'This is a sample')
.then(() => console.log('file successfully created'))
.catch((error) => console.log('error creating file'));
//ls: shows directory