const { Readable } = require('stream');

const peaks = [
    "Tallac",
    "Ralston",
    "Rubicon",
    "Twin Peaks",
    "Castle Peak",
    "Rose",
    "Freel Peak"
];

class StreamFromArray extends Readable{ //inherts Readable inferface
    
    constructor(array){
        //stream has two modes: binary, object. To read stream as string, we need to set UTF-8
        // super();
        // super({encoding: "utf-8"})
        super({objectMode: true}); //if the stream is in object mode, it can pass in any time of javascript object
        this.array = array;
        this.index = 0;
    }
    
    _read(){ //it happens when the stream reads data, binary mode
        if(this.index <= this.array.length)
        {
            // const chunk = this.array[this.index]
            //change chunk to object
            const chunk = {
                data: this.array[this.index],
                index: this.index
            };
            this.push(chunk);
            this.index += 1;
        }
        else{
            this.push(null); //it will tell readable stream content is over
        }
    }
}

const peakStream = new StreamFromArray(peaks);

peakStream.on('data', (chunk) => console.log(chunk));
peakStream.on('end', () => console.log('done!'))
//Streams implement the event emitter and can raise events