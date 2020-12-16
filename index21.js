//Chapter 3 HTTP Streaming - Handling range requests

// Safari requires

const { createServer } = require('http');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util'); 

const fileName = './powder-day.mp4';
const fileInfo = promisify(stat); //stat function has callback, convert it to promise


createServer(async (req, res) =>{
    const { size } = await fileInfo(fileName); //call line 11-14 to wait until it is resolved
    const range = req.headers.range;
    if(range){
        //array destructuring
        let [ start, end ] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10); //parse it to integer
        end = end ? parseInt(end, 10) : size - 1; //end might not always present
        res.writeHead(206, {
            'Content-Range': `bytes ${start} - ${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': 'video/mp4' 
        })
        //206 partial content, render part of video
        createReadStream(fileName, { start, end }).pipe(res);
    }
    else{
        //send full video back
        res.writeHead(200, { 
            'Content-Length': size, //the browser know how long the video we are sending
            'Content-Type': 'video/mp4' 
        });
        createReadStream(fileName).pipe(res);
    }
}).listen(3000, () => console.log('server running - 3000'))


