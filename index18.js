//Chapter 2 Advanced Systems - Duplex Streams
//Duplex streams: A stream that implements both a readable and a writable. These streams allow data to pass through
//Readable streams will pipe data into a duplex stream and the duplex stream can also write that data
//Duplex stream represent the middle sections of pipelines

const { Duplex, PassThrough } = require('stream');
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('./powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');

class Throttle extends Duplex { 
    constructor(ms)
    {
        super();
        this.delay = ms;
    }

    _write(chunk, encoding, callback)
    {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _read(){}

    //we are not getting no data 
    _final(){
        this.push(null); 
    }
}

const report = new PassThrough();
const throttle = new Throttle(100);

var total = 0;
report.on('data', (chunk) =>{
    total += chunk.length;
    console.log('bytes: ', total);
})
//duplex read data from readStream and send data to writeStream
readStream
    .pipe(throttle)
    .pipe(report)
    .pipe(writeStream); //write stream creats a copy of readstream


//duplex stream help us compose streams into pipilines, it represent the center parts of a pipeline