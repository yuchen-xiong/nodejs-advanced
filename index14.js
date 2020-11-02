//Chapter 2 Advanced Systems - Using readable streams

const fs = require('fs');

const readStream = fs.createReadStream('./powder-day.mp4');

//flowing mode
//string will automatically pushes each chunk of data into pipeline
readStream.on('data',(chunk) =>{
    // console.log('reading little chunk\n', chunk);
    console.log('size: ', chunk.length);
})

readStream.on('end', () => {
    console.log('read stream finished');
})

readStream.on('error', (error) => {
    console.log('an error has occured.');
    console.log(error);
})

readStream.pause(); //change readStream from flowing mode to non-flowing mode

//non-flowing mode
//we had to ask data
process.stdin.on('data', (chunk) => {
    // var text = chunk.toString().trim();
    // console.log('echo: ' + text);
    if(chunk.toString().trim() == 'finish'){
        readStream.resume(); //change readStream back to following mode
    }
    readStream.read();
})