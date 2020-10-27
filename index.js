
// verison 1.0
// function hideString(str)
// {
//     //whenever we return a value from a function
//     //we are working with code synchronously using direct style
//     //in additon to direct style
   
//     return str.replace(/[a-zA-z]/g, 'X');
// }

// there is another sync style called CPS (continuation passing style)
//it takes another function as argument
//version 1.1
// function hideString(str, done)
// {
//     done(str.replace(/[a-zA-Z]/g, 'X')); //actually passing hidden string back via a function
// }


//version 1.2
function hideString(str, done)
{
    // asynchronous, pass the result in the next tick or loop
    //To invoke the function send to next tick in next node.js loop
    process.nextTick(() => {
        done(str.replace(/[a-zA-Z]/g, 'X')); //actually passing hidden string back via a function
    });
    
}

//our code no longer executed the order in the page, it executed when it is ready


// var hidden = hideString("Hello World");
//hidden will replace "Hello World" with XXXXX XXXXX
//this code is synchronous, (entire thread has executed in order)
//the hide string function is executed immediately on the current thread

//use a function to pass data back
hideString("Hello World", (hidden) => {
    console.log(hidden);
});

//a callback needs to be asynchronous


console.log('end');