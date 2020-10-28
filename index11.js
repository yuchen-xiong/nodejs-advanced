const { promises } = require("fs");

//concurrent tasks
var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})

//balance between sequential and concurrently 
//running all tasks at one time can be costly
//running one taks at a time may took too long
//solution: creat a task queue: run a specificed number of tasks concurrently at the same time
var tasks = [
    delay(4),
    delay(6),
    delay(4),
    delay(3),
    delay(5),
    delay(7),
    delay(9),
    delay(10), //a task is taking really long
    delay(3),
    delay(5)      
];

class PromiseQueue{
    //default concurrent # of tasks to 1
    constructor(promises = [], concurrentCount = 1){
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises; //we will be removing tasks from this list
        this.running = [];
        this.complete = [];
    }

    //tells us when to run another task
    get runAnother(){
        return (this.running.length < this.concurrent) && this.todo.length; //less than the threshold and has to do items
    }

    //run our tasks concurrently
    run(){
        while(this.runAnother)
        {
            var promise = this.todo.shift(); //remove the promise from the todo list and assign to promise variable
            promise.then(() => {
                this.complete.push(this.running.shift()) //when promise is resolved, move promise from this.running to this.complete
                this.run(); //complete, run again
            })
            this.running.push(promise);
        }
    }

}

//execute 2 tasks at the same time
//delayQueue is the instance of PromiseQueue as defined above
var delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();