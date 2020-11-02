//Chapter 2 Advanced Systems - Piping streams

// const { createReadStream, createWriteStream } = require('fs');
const { createWriteStream } = require('fs');

// const readStream = createReadStream('./powder-day.mp4');
// const writeStream = createWriteStream('./copy.mp4');

const writeStream = createWriteStream('./file.txt');



//Instead of wiring up a bunk of listeners to listen for chunks of data and then pass those chunks of data to into the write stream
//the pipe method is doing it for us
//the pipe method also automatically handles backpressure for us
//the only thing we didn't do is wiring up an error listener
// readStream.pipe(writeStream).on('error', console.error) ;

//any readstream can be piped to any writestream

process.stdin.pipe(writeStream);

//echo "Hello World" | node index17
//cat ./sample.txt | node index17