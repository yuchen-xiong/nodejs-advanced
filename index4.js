//In Promise, we don't have to have an error to have a rejection
//we can simply invoke the rejects mehod anytime we want

var delay = (seconds) => new Promise((resolves, rejects) => {
   
    // throw new Error('argh');
    //we reject promise based on the value of seconds element
    if(seconds > 3){
        rejects(new Error(`${seconds} is too long!`))
    }
    setTimeout(() => {
        resolves('the long delay has ended')
    }, seconds * 1000);
});

// delay(1)
delay(4)
.then(console.log)
.then(() => 42)
.then((number) => console.log(`hello world: ${number}`))
//if error occurs, we can handle it in the cathc method
//but also if we reject the promise for any reason
//we can also handle that with the catch method
.catch((error) => console.log(`error: ${error.message}`));

console.log('end first tick');