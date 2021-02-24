//---------- Promise/Deferred 模式 ----------
//Promises/A
//1. Promise 操作只会处在3种状态中的一种：未完成态，完成态和失败态
//2. Promise 状态只会从未完成态向完成态或失败态转化
//3. Promise 的状态一旦转化将不能被更改
//then()方法：
//1. 接受完成态、错误态的回调方法。在操作完成或出现错误时，将会调用对应方法。
//2. 可选地支持 progress 事件回调作为第三个方法。
//3. then() 方法只接受 function 对象，其余对象被忽略。
//4. then() 方法继续返回 Promise 对象，以实现链式调用。

const EventEmitter = require("events");
const util = require("util");

//通过继承 Node 的 events 模块来完成一个简单的 Promise/A 实现
const Promise = function () {
    EventEmitter.call(this);
};
util.inherits(Promise,);
Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        //利用once()方法保证成功回调只执行一次
        this.once('success', fulfilledHandler);
    }
    if (typeof errorHandler === 'function') {
        //利用once()方法保证异常回调只执行一次
        this.once('error', errorHandler);
    }
    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }
    return this;
};

//then() 所做的是存放回调函数，接下来实现触发回调的对象 Deferred (延迟对象)
const Deferred = () => {
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = (obj) => {
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
};

Deferred.prototype.reject = (err) => {
    this.state = 'failed';
    this.promise.emit('error', err);
};

Deferred.prototype.progress = (data) => {
    this.promise.emit('progress', data);
};

//对一个响应对象进行封装
//...
//Promise 通过封装异步调用，实现正向反向用例分离以及逻辑处理延迟

//----- 多异步协作 -----
Deferred.prototype.all = (promises) => {
    let count = promises.length;
    const that = this;
    const results = [];
    promises.forEach((promise, i) => {
        promise.then((data) => {
            count--;
            results[i] = data;
            if (count === 0) {
                that.resolve(results);
            }
        }, (err) => {
            that.reject(err);
        });
    });
    return this.promise;
};
const readFile = () => { };
const promise1 = readFile('foo.txt', 'utf-8');
const promise2 = readFile('bar.txt', 'utf-8');
const deferred = new Deferred();
deferred.all([promise1, promise2]).then((result) => {
    //TODO
}, (err) => {
    //TODO
});

//异步并发控制
