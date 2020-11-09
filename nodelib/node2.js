/* //---stdin 与 stdout : 监听 readable 事件---

process.stdin.on('readable', function () {
    var input = process.stdin.read();
    if (input != null) {
        process.stdout.write(`stdout: ${input}`);
    }
}); 


//监听退出字符串

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
    var input = process.stdin.read();

    if (input !== null) {
        let command = input.trim();
        if (command == 'exit')
            process.exit(0);
        
        process.stdout.write(`stdout: ${input}`);
    }
});*/


/*//---缓冲器 buffer 与类型化数组 Uint8Array---

let a = [1, 2, 3];
let b = Buffer.from(a);
console.log(b);


let a2 = new Uint8Array([1, 2, 3]);
let b2 = Buffer.from(a2);
console.log(b2);

let b3 = Buffer.alloc(10);
console.log(b3);

let b4 = Buffer.allocUnsafe(10);
console.log(b4); 

//Buffer => JSON

let buf = Buffer.from('This is my pretty example');
let json = JSON.stringify(buf);

console.log(json);

//JSON => Buffer => String
let buf2 = Buffer.from(JSON.parse(json).data);
console.log(buf2.toString());

//StringDecoder 获取完整 UTF-8 字符序列
let StringDecoder = require('string_decoder').StringDecoder;
let decoder = new StringDecoder('utf8');

let euro = new Buffer.from([0xE2, 0x82]);
let euro2 = new Buffer.from([0xAC]);

console.log(decoder.write(euro));
console.log(decoder.write(euro2));

console.log(euro.toString());
console.log(euro2.toString());

//字符串写入缓冲器
let buf = Buffer.alloc(3);
buf.write('$', 'utf-8');
console.log(buf.toString());
console.log(buf.length);

//缓冲器操作
var buf = new Buffer.alloc(4);

buf.writeUInt8(0x63, 0);
buf.writeUInt8(0x61, 1);
buf[3] = 0x73;
buf[2] = 0x74;

console.log(buf.toString());

//buffer.slice() 创建新缓冲器及修改
var buf1 = new Buffer.from('this is the way we build our buffer');
var lnth = buf1.length;

console.log(buf1.slice().toString());

var buf2 = buf1.slice(19, lnth);
console.log(buf2.toString());

buf2.fill('*', 0, 5);
console.log(buf2.toString());
console.log(buf1.toString());

console.log(buf1.equals(buf2));
//buffer.copy() 从一个缓冲器复制到另一个(略)
//buf1.compare(buf2) 前大于后返回 1 否则 -1*/


/*//---Node 回调函数和异步事件处理---

var http = require('http');

var server = http.createServer(); 

//server.on() 捕获(订阅)事件
server.on('request', function (request, response) {
    console.log('request event');

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
});

server.on('connection', function () {
    console.log('connection event');
});

//listening 事件订阅
server.listen(8124, function () {
    console.log('listening event'); //第二个打印(创建服务器后)
});

console.log('Server running on port 8124'); //最先打印

//创建异步回调函数
//第一个参数为数字，第二个参数为回调函数

var fib = function (n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
};

var Obj = function () { }; //创建对象
Obj.prototype.doSomething = function (arg1_) { //函数 dosomething
    var callback_ = arguments[arguments.length - 1]; //最后一个参数
    callback = (typeof (callback_) == 'function' ? callback_ : null); //判断参数类型
    var arg1 = typeof arg1_ === 'number' ? arg1_ : null; //只处理 number 类型的参数
    if (!arg1)
        return callback(new Error('first arg missing or not a number'));
    process.nextTick(function () { //异步回调时，确保调用前清除事件循环
        var data = fib(arg1);
        callback(null, data);
    });
}

var test = new Obj();
var number = 40;

test.doSomething(number, function (err, value) {
    if (err)
        console.error(err); //异步不能依赖 throw...catch, 错误处理在 Error 对象中进行
    else
        console.log('fibonaci value for %d is %d', number, value);
});

console.log('called doSomething'); //先处理同步，再调用阻塞功能

//EventEmitter 激活异步处理

var eventEmitter = require('events').EventEmitter;

var counter = 0;

var em = new eventEmitter();

setInterval(function () { em.emit('timed', counter++); }, 3000); //创建事件timed

em.on('timed', function (data) { // function 括号中是事件 timed 的回调
    console.log('timed ' + data);
});*/


/*//创建对象并使用 Util 继承 EventEmitter
"use strict";

var util = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

function InputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./' + file + '.txt',
        {
            'flags': 'a',
            'encoding': 'utf8',
            'mode': 0o666
        });
};

util.inherits(InputChecker, eventEmitter);

//check 方法检查特定输入命令
InputChecker.prototype.check = function check(input) {
    let command = input.trim().substr(0, 3);

    //emit 根据命令设置触发事件
    if (command == "wr:") {
        this.emit('write', input.substr(3, input.length));
    } else if (command == "en:") {
        this.emit('end');
    } else {
        this.emit('echo', input);
    }
};

//new object
let ic = new InputChecker('Shelley', 'output');

//监听 write, end 与 echo 事件
ic.on('write', function (data) {
    this.writeStream.write(data, 'utf8');
    process.stdout.write('...file saved\n');
});

ic.on('echo', function (data) {
    process.stdout.write(ic.name + ' wrote ' + data);
});

ic.on('end', function () {
    process.exit();
});

//process.stdin 对象继承自 EventEmitter
process.stdin.setEncoding('utf8');
process.stdin.on('readable', function () {
    let input = process.stdin.read();
    if (input !== null)
        ic.check(input);
});*/


/*//事件循环和定时器
var timer1 = setTimeout(function (name) {
    console.log('Hello ' + name);
}, 3000, 'Shelley');//可选参数为回调函数参数

console.log("waiting on timer...");

setTimeout(function (timer) {
    clearTimeout(timer);
    console.log('cleared timer');
}, 3000, timer1);

var interval = setInterval(function (name) {
    console.log('Hello ' + name);
}, 3000, 'Shelley');

var timer = setTimeout(function (interval) {
    clearInterval(interval);
    console.log('cleared timer');
}, 30000, interval);

timer.unref();

console.log('waiting on first interval...');*/


/*//---嵌套回调和异常处理---

//同步
var fs = require('fs');

try {
    var data = fs.readFileSync('./apples.txt', 'utf8');
    console.log(data);
    var adjData = data.replace(/[A|a]pple/g, 'orange');

    fs.writeFileSync('./oranges.txt', adjData);
} catch (err) {
    console.error(err);
}

//异步嵌套
var fs = require('fs');

fs.readFile('./apples.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
    } else {
        var adjData = data.replace(/apple/g, 'orange');
        fs.writeFile('./oranges.txt', adjData, function (err) {
            if (err) console.error(err);
        });
    }
});

//检索要修改的文件袋目录列表
var fs = require('fs');
var writeStream = fs.createWriteStream('./log.txt',
    {
        'flags': 'a',
        'toString': 'utf8',
        'mode': 0666
    });

writeStream.on('open', function () {
    fs.readdir('./data/', function (err, files) {
        if (err) {
            console.log(err.message);
        } else {
            files.forEach(function (name) {
                fs.readFile('./data/' + name, 'utf8', function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        var adjData = data.replace(/somecompany\.com/g,
                            'burningbird.net');
                        fs.writeFile('./data/' + name, adjData, function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                writeStream.write('changed' + name + '\n', 'utf8', function (err) {
                                    if (err) console.error(err.message);
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});

writeStream.on('error', function (err) {
    console.error("ERROR:" + err);
});*/

//添加日志消息递增计数器

var fs = require('fs');
var writeStream = fs.createWriteStream('./log.txt',
    {
        flags: 'a',
        encoding: 'utf8',
        mode: 0666
    });
writeStream.on('open', function () {
    var counter = 0;

    fs.readdir('./data/', function (err, files) {
        if (err) {
            console.error(err.message);
        } else {
            files.forEach(function (name) {
                fs.stat('./data/' + name, function (err, stats) {
                    if (err) return err;
                    if (!stats.isFile()) {
                        counter++;
                        return;
                    }
                    fs.readFile('./data/' + name, 'utf8', function (err, data) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            writeStream.write('changed' + name + '\n',
                                function (err) {
                                    if (err) {
                                        console.log('finished' + name);
                                        counter++;
                                        if (counter >= files.length) {
                                            console.log('all done');
                                        }
                                    }
                                });
                        }
                    });
                });
            });
        }
    });
});
writeStream.on('error', function (err) {
    console.error("ERROR:" + err);
});