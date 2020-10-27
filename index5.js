//promisify is a function we can use to convert callback functions into promises
var { promisify } = require('util');

var delay = (seconds, callback) => {
    if(seconds > 3)
    {
        callback(new Error(`${seconds} seconds it too long!`));
    } else{
        setTimeout( () =>
            callback(null, `the ${seconds} second delay is over.`),
        );
    }
}

// delay(2, (error, message) =>{
//     if(error)
//     {
//         console.log(error.message);
//     }
//     else{
//         console.log(message);
//     }
// })

// delay(4, (error, message) =>{
//     if(error)
//     {
//         console.log(error.message);
//     }
//     else{
//         console.log(message);
//     }
// })

//convert delay to promise function
var promiseDelay = promisify(delay);

// promiseDelay(2)
promiseDelay(5)
.then(console.log)
.catch((error) => console.log(`error: ${error.message}`));
