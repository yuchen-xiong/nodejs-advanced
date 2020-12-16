//Chapter 3 HTTP Streaming - Streaming to the browser

const { createServer } = require('http');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util'); 

const fileName = './powder-day.mp4';
const fileInfo = promisify(stat); //stat function has callback, convert it to promise


createServer(async (req, res) =>{
    const { size } = await fileInfo(fileName); //call line 11-14 to wait until it is resolved
    res.writeHead(200, { 
        'Content-Length': size, //the browser know how long the video we are sending
        'Content-Type': 'video/mp4' 
    });
    createReadStream(fileName).pipe(res);
}).listen(3000, () => console.log('server running - 3000'))


