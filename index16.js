//Chapter 2 Advanced Systems - Backpressure

//things come from read stream will be too much for write stream to handle

const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4', {
    // highWaterMark : 1628920128
});

readStream.on('data',(chunk) =>{
    const result = writeStream.write(chunk);
    //if the result if false, meaning it's full (memory)
    if(!result)
    {
        console.log('backpressure')
        readStream.pause();
    }
})

readStream.on('error', (error) => {
    console.log('an error occured', error.message);
})

readStream.on('end', () => {
    writeStream.end();
})

writeStream.on('drain', () => {
    console.log('drain');
    readStream.resume();
})

writeStream.on('close', () =>{
    process.stdout.write('file copied\n');
})