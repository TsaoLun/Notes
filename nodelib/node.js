// //---Web Server---

// var http = require('http');
// var server = http.createServer();

// server.on('request', function (request, response) {
//     console.log('request event');
//     response.writeHead(200, { 'Content-Type': 'text/plain' });
//     response.end('Hello World\n');
// });

// server.on('connection', function () {
//     console.log('connection event');
// });

// server.listen(8124, function () {
//     console.log('listening event');
// });

// console.log('Server running on port 8124');

// //---fibonaci---
// var fib = function (n) {
//     if (n < 2) return n;
//     return fib(n - 1) + fib(n - 2);
// };

// var Obj = function () { };

// Obj.prototype.doSomething = function (arg1_) {
//     var callback_ = arguments[arguments.length - 1];
//     callback = (typeof (callback_) == 'function' ? callback_ : null);
//     var arg1 = typeof arg1_ === 'number' ? arg1_ : null;
//     if (!arg1)
//         return callback(new Error('first arg missing or not a number'));

//     process.nextTick(function () {
//         //block on CPU
//         var data = fib(arg1);
//         callback(null, data);
//     });
// }

// var test = new Obj();
// var number = 10;

// test.doSomething(number, function (err, value) {
//     if (err)
//         console.error(err);
//     else
//         console.log('fibonaci value for %d is %d', number, value);
// });

// console.log('called doSomething');

// //---EventEmitter---
// var eventEmitter = require('events').EventEmitter;
// var counter = 0;

// var em = new eventEmitter();

// setInterval(function () { em.emit('timed', counter++); }, 3000);

// em.on('timed', function (data) {
//     console.log('timed' + data);
// })

//---Util 继承 | util.inherits---
//---EventEmitter InputChecker---
"use strict"

var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

function InputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
        'flags': 'a',
        'encoding': 'utf8',
        'mode': 0o666
    });
};

util.inherits(InputChecker, eventEmitter);
InputChecker.prototype.check = function check(input) {
    let command = input.trim().substr(0, 3);

    if (command == 'wr:') {
        this.emit('write', input.substr(3, input.length));
    } else if (command == 'en:') {
        this.emit('end');
    } else {
        this.emit('echo', input);
    }
};

let ic = new InputChecker('Shelley', 'output');
ic.on('write', function (data) {
    this.writeStream.write(data, 'utf8');
});

ic.on('echo', function (data) {
    process.stdout.write(ic.name + ' wrote ' + data);
});

ic.on('end', function () {
    process.exit();
});

process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    let input = process.stdin.read();
    if (input !== null)
        ic.check(input);
});