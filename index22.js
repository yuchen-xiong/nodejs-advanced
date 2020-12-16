//Chapter 3 HTTP Streaming - Forking and uploading streams

const { createServer, request } = require('http');
const { stat, createReadStream, createWriteStream } = require('fs');
const { promisify } = require('util'); 

const fileName = './powder-day.mp4';
const fileInfo = promisify(stat);

const respondWithVideo = async (req, res) => {
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
}


createServer((req, res) => {
    if(req.method === 'POST'){
        req.pipe(res);
        req.pipe(process.stdout);
        req.pipe(createWriteStream('./upload.file'));
    }
    else if(req.url === '/video'){
        respondWithVideo(req, res);
    }
    else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="upload-file" />
                <button>Upload File</button>
            </form>
        `);
    }
}).listen(3000, () => console.log('server running - 3000'))