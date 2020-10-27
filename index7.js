var fs = require('fs')
var { promisify } = require('util')
var beep = () => process.stdout.write("\x07"); //macOS to beep
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);

var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})

//instead of returning a new promise, invoke promise.resolve so that will create a new promise object but it will automatically resolve it
//then I can chain squential steps using then methods
//much eaiser to maintain and edit than previous sequential callback
const doStuffSequentially = () => Promise.resolve()
.then(() => console.log('starting'))
.then(() => delay(1))//return a promise; when I return a promise inside a then method, that means that the then emthod will wait for this delay before invoking the next then method
.then(() => 'waiting')
.then(console.log) //in our thenables, if a function returns something, it can be used in the next thenable, e.g message => console.log(message) v.s. console.log will do the same thing
.then(() => delay(2))
.then(() => writeFile('file.txt', 'Sample File...'))
.then(beep)
.then(() => 'file.txt created')
.then(console.log)
.then(() => delay(3))
.then(() => unlink('file.txt'))
.then(beep)
.then(() => 'file.txt removed')
.then(console.log)
// .catch((error) => console.error(error)) //takes the first argument by default
.catch(console.error) 

//sequential execution with callbacks 
//nesting too many callbacks can create anti-pattern called callback hell or pyramid of doom
//a lot sequential steps that are all nested with callbacks, really hard to work with
//nightmare to maintain or edit
// const doStuffSequentially = () => {
//     console.log('starting');
//     setTimeout(() => {
//         console.log('waiting');
//         setTimeout(() => {
//             console.log('waiting some more');
//             fs.writeFile('file.txt', 'Sample File...', error =>{
//                 if(error)
//                 {
//                     console.error(error);
//                 }
//                 else{
//                     beep();
//                     console.log('file.txt created')
//                     setTimeout(() =>{
//                         beep();
//                         fs.unlink('file.txt', error => {
//                             if(error)
//                             {
//                                 console.error(error);
//                             }
//                             else{
//                                 console.log('file.txt removed');
//                                 console.log('sequential execution complete');
//                             }
//                         })
//                     }, 3000)
//                 }
//             })
//         }, 2000)
//     }, 1000)
// }

doStuffSequentially();