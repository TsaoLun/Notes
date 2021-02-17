//--- 异步 ---
//Node 异步 I/O : 事件循环，观察者和请求对象

//每个事件循环中有一个或多个观察者，通过询问判断是否有事件处理
//事件循环是典型的生产者/消费者模型，异步 I/O 、网络请求是事件生产者
//事件循环、观察者、请求对象、I/O 线程池共同构成 Node 异步 I/O 模型

//非 I/O 异步 API
//setTimeout 较浪费性能，process.nextTick() 较轻量

/* setImmediate(function () {
    console.log('延迟执行 setImmediate');
});
process.nextTick(function () {
    console.log('延迟执行 process.nextTick');
});

console.log('正常执行'); */

//process.nextTick() 回调的优先级高于 setImmediate()
//前者为 idle 观察者，后者为 check 观察者，I/O 优先级居中
//事件驱动与高性能服务器


//--- 异步编程 ---
//高阶函数可以把函数作为参数，或者将函数作为返回值
/* function foo(x) {
    return function () {
        return x;
    };
} */
//除函数调用返回外，还有一种后续传递风格 Continuation Passing Style
//将函数的业务重点从返回值转移到了回调函数中(这样不是多写了函数吗？)
/* function foo(x, bar) {
    return bar(x);
} */

//可以通过传入不同的 bar 得到不同结果，典型的例子是 sort() 方法
//compareFunction 返回负数交换顺序，返回 a - b 顺序，返回 b - a 倒序

/* const points = [1, 30, 2, 40];
points.sort(function () {
    return -10; //直接倒序
});
console.log(points);

const pointsTwo = [14, 1.2, 1.33, 1.1, 1.32, 1.4, 30, 2, 50, 40];
pointsTwo.sort(function (a, b) {
    console.log(`${a}比${b}${a < b ? '小' : '大'}`);
    return b - a;
});
console.log(pointsTwo); */

//首先比较相邻的大小，交换后倒序与已排序的比较
//倒着比小于则交换，大于则说明顺序无误
//比较完（完成初步相邻对比）取已排序的中位数（大小一位取决于刚刚那个数字放置的上下部分）与新的一位比较
//新数大于中位数则拿新数比较已排序的最大值；新数小于中位数则从中位数开始倒序比较
//注意新数在比较已排序数组时，一旦确定位置则无需再比下去

//标准比较函数
/* function compare(a, b) {
    if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
      return -1;
    }
    if (a > b ) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }
 */

//偏函数：创建一个函数调用部分参数或变量已经预置的函数
/* const isType = function (type) {
    return function (obj) {
        return toString.call(obj) === '[object ' + type + ']';
    };
};
const isString = isType('String');
const isFunction = isType('Function');

console.log(isString('x'));
console.log(isString(1));
console.log(isFunction(isFunction)); */

//try-catch 只能捕获当次事件循环的异常，对下一个 Tick 才抛出的异常无能为力(process.nextTick)
//原则1: 必须执行调用者传入的回调函数
//原则2: 正确传递回异常供调用者判断

//事件发布/订阅模式
//events 模块有 addListener/on(), once(), removeListener(), emit() 等事件监听模式的方法实现
//emit() 发布事件多半是伴随事件循环而异步触发的

const http = require('http');

const options = {
    host: 'www.baidu.com',
    port: 80,
    path: '/upload',
    meth: 'POST'
};

//http.request 
//第一个参数为 option/URL，
//第二个参数为参数是res(http.IncomingMessage)的回调函数
/* const req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    res.on('end', function () {
        //TODO
    });
});
//http.ClientRequest，on()第一个参数'error'，第二个参数为错误监听函数
req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
//write data to request body
req.write('data\n');
req.write('data\n');
req.end(); */

//实现一个继承 events 的模块
/* const events = require('events');
const util = require('util');
//通过 util.inherits 模块实现继承

function Stream() {
    events.EventEmitter.call(this);
}

util.inherits(Stream, events.EventEmitter);
console.log(Stream); */

// class inheritStream extends events.EventEmitter {
//     constructor() {
//         super();
//     }
// }
// console.log(inheritStream);

//利用事件队列解决雪崩问题
