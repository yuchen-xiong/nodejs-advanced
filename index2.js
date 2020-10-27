function delay(seconds, callback)
{
    setTimeout(callback, seconds * 1000)
}

//sequential executed call back functions (callback hell)
console.log('starting delays');
delay(2, () => {
    console.log('two seconds');
    delay(1, () => {
        console.log('three seconds');
        delay(1, () =>{
            console.log('four seconds');
        });
    })
})