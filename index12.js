const { promises } = require("fs");

//Logging concurrent tasks
//npm install log-update
//log-update allows us to keep the updates that we wannt log to the console in the same place
var logUpdate = require('log-update') //keep overriding in the console
var toX = () => 'X'; //return a capital X

var delay = (seconds) => new Promise((resolves) =>{
    setTimeout(resolves, seconds * 1000);
})

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
    constructor(promises = [], concurrentCount = 1){
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises; 
        this.running = [];
        this.complete = [];
    }

    get runAnother(){
        return (this.running.length < this.concurrent) && this.todo.length; 
    }

    
    graphTask(){
        var { todo, running, complete} = this;
        logUpdate(`
        

todo: [${todo.map(toX)}]
running: [${running.map(toX)}]
complete: [${complete.map(toX)}]
        `);
    }

    run(){
        while(this.runAnother)
        {
            var promise = this.todo.shift(); 
            promise.then(() => {
                this.complete.push(this.running.shift()) 
                this.graphTask();
                this.run(); 
            })
            this.running.push(promise);
            this.graphTask();
        }
    }

}

var delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();