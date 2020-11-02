//Chapter 2 Advanced Systems - Writable streams
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');
;
readStream.on('data',(chunk) =>{
    writeStream.write(chunk);
})

readStream.on('error', (error) => {
    console.log('an error occured', error.message);
})

readStream.on('end', () => {
    writeStream.end();
})

writeStream.on('close', () =>{
    process.stdout.write('file copied\n');
})
