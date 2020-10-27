var fs = require('fs')
var { promisify } = require('util')
var beep = () => process.stdout.write("\x07"); //macOS to beep
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);

var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})


//don't want to compose functions in a chain
//if you want to convert a function to async function, simply use async keyword before function declaration
//async functions allows us to write codes appears synchronous, 
//codes can be written line by line and certian lines will be wait for a result before executre any further
//codes are more clean than then chains
const doStuffSequentially = async () => {
    console.log('starting');
    await delay(1);
    console.log('waiting');
    await delay(2);
    try
    {
        await writeFile('file.txt', 'Sample File...');
        beep();
    }
    catch(error){
        console.error(error);
    }
   
    console.log('file.txt created');
    await delay(3);
    await unlink('file.txt')
    beep();
    console.log('file.txt removed')
    //all of above lines are going to wait before processing any further   
    //we will wait the file to be unlinked before we return a resolved promise 
    return Promise.resolve(); //by returning Promise.resolve(), it allows us to do extra thenable
    
}

//pros:
//1. we can handle errors with tryCatch blocks. That will allow us to specify what errors we want to handle exactly
doStuffSequentially();
// .then();