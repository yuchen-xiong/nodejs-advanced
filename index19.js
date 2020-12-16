//Chapter 2 Advanced Systems - Transform Streams
//Transform streams: a special type of duplex stream. Instead of simply passing data, it changes data before readable streams send to writeable streams

const { Transform } = require('stream');

class ReplaceText extends Transform{
    constructor(char){
        super();
        this.replaceChar = char;
    }

    _transform(chunk, encoding, callback){
        const transformChunk = chunk.toString()
            .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar); // /g replace globally
            this.push(transformChunk);
            callback();
    }

    _flash(callback){
        this.push('more stuff is being passed');
        callback();
    }
}

var xStream = new ReplaceText('XX');

process.stdin
    .pipe(xStream)
    .pipe(process.stdout)