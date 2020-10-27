var fs = require('fs')
var { promisify } = require('util')
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var readdir = promisify(fs.readdir);

var beep = () => process.stdout.write("\x07"); //macOS to beep
var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})

//read the directory and give the result
// readdir.then((files) =>{

// })

//any data that the readdir promise would return, we can actually set using an equal sign
async function start(){
    var files = await readdir(__dirname); //__dirname: current directory
    console.log(files);
}

start();