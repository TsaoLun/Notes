//--- 异步 I/O ---
// const fs = require('fs');

/* fs.readFile('/path', function(err, file){
    console.log('读取文件完成');
});
console.log('发起读取文件'); */

//通过异步实现并形 I/O 操作，两个文件哪个后完成取决于读取文件耗时
/* fs.readFile('/path1', function (err, file) {
    console.log('读取文件 1 完成');
});
fs.readFile('/path2', function (err, file) {
    console.log('读取文件 2 完成');
}); */

//--- 事件与回调函数 ---
//创建 Web 服务器并监听 8080 端口
//对服务器绑定 request 事件，对请求对象绑定 data 事件与 end 事件
/* const http = require('http');
const querystring = require('querystring');

//监听服务器 request 事件
http.createServer(function(req, res) {
    let postData = '';
    req.setEncoding('utf8');
    //监听请求的 data 事件
    req.on('data', function(chunk) {
        postData += chunk;
    });
    //监听请求的 end 事件
    req.on('end', function(){
        res.end(postData);
    });
}).listen(8080);

console.log('服务器启动完成'); */

//--- 单线程 ---
//--- libuv ---
//--- 斐波那契测试 ---
const fib = function (n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
};

const Obj = function () { }; //创建对象
Obj.prototype.doSomething = function (arg1_) { //函数 dosomething
    let callback_ = arguments[arguments.length - 1]; //最后一个参数
    const callback = (typeof (callback_) == 'function' ? callback_ : null); //判断参数类型
    let arg1 = typeof arg1_ === 'number' ? arg1_ : null; //只处理 number 类型的参数
    if (!arg1)
        return callback(new Error('first arg missing or not a number'));
    process.nextTick(function () { //异步回调时，确保调用前清除事件循环
        let data = fib(arg1);
        callback(null, data);
    });
};

const test = new Obj();
const number = 40;

const start = new Date();
test.doSomething(number, function (err, value) {
    if (err)
        console.error(err); //异步不能依赖 throw...catch, 错误处理在 Error 对象中进行
    else
        console.log('fibonaci value for %d is %d', number, value);
        const end = new Date();
        console.log(end.getTime()-start.getTime());
});