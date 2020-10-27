//the idea of Promise is we can wait for asynchronous process to complete
//then we can resolve promise (executed successfully)
var delay = (seconds) => new Promise((resolves, rejects) => {
    // setTimeout(resolves, seconds * 1000);
    setTimeout(() => {
        resolves('the long deplay has ended');
    }, seconds * 1000);
});

//using promise we don't have to pass back callback method
//if promise executed successfully, it will pass resolves to then function
// delay(1).then(() => console.log('the delay has ended'));
//.then is set to take functions
// delay(1).then((message) => console.log(message));
//a chain, can add other methods
// delay(1).then(console.log).then(() => console.log('hello world' ));
delay(1).then(console.log).then(() => 42).then((number) => console.log(`hello world: ${number}`));
// var delay = (seconds, callback) => {
//     setTimeout(callback, seconds * 1000);
// };

delay(1, () =>{
    console.log('the delay has ended');
});

console.log('end first tick');