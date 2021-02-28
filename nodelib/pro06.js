//---------- Buffer ----------

/* const str = "深入浅出node.js";
const buf = Buffer.from(str, 'utf-8');
console.log(buf);

const buff = Buffer.alloc(100);
console.log(buff.length);
console.log(buff[10]); */

//Node 采用了 slab 分配机制(动态内存管理机制，有 full, partial, empty 三种状态)
//8KB 为区分 Buffer 大对象与小对象的界限，也是 slab 的单位单元

//分配小 Buffer 对象 ( node )
//使用局部变量 pool 作为中间处理对象，处于分配状态的 slab 单元都指向它。
//构造时会检查 pool 如果没有被创建就会创建一个新的 slab 单元指向它。
//同时，当前 Buffer 对象的 parent 属性指向该 slab 并记录下位置，开始使用时 slab 对象会记录使用了多少字节。
//此时 slab 状态为 partial，再次创建 Buffer 对象时会判断 slab 剩余空间，如果够则进行分配，不够用则会构造新的slab(原slab出现浪费)
//注意，slab 中的 Buffer 如果没有及时回收，会造成至少8KB的内存被占用

//分配大 Buffer 对象 ( c++ )
//直接分配一个 SlowBuffer 对象作为 slab 单元
//Buffer 对象是 JS 层的，会被 V8 GC 管理，而其 parent 指向的 SlowBuffer 来自于 C++


//----- Buffer 的转换与拼接 -----
/* const fs = require('fs');
const rs = fs.createReadStream('moon.md', { highWaterMark: 11 }); //限制Buffer长度为11
//rs.setEncoding('utf8); //
let data = '';
rs.on("data", (chunk) => {
    data += chunk; //拼接
});
rs.on("end", () => {
    console.log(data); //出现乱码(中文占3字节，从第四个字开始乱码：床前明�)
}); */


//---------- TCP/UDP/HTTP/HTTPS ----------

//+++++ TCP +++++
//TCP：传输控制协议(面向连接的协议，在传输之前需要3次握手形成会话)【请求连接，响应，开始传输】
//只有会话形成后，服务器端和客户端之间才能互相发送数据，创建会话的过程中两边分别提供一个套接字，通过套接字形成连接。

//创建 TCP 服务器端并用 Telnet 进行会话
/* const net = require('net');
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        socket.write("你好\n");
    });
    socket.on('end', () => {
        console.log('连接断开');
    });
    socket.write("欢迎光临《深入浅出Node.js》: \n");
});

server.listen(8124, () => {
    console.log('server bound');
}); */
//也可以通过 net 模块构造客户端进行会话(见client.js)

//TCP 服务的事件：服务器事件与连接事件
//1. 服务器事件
//通过 net.createServer() 创建的服务器是一个 EventEmitter 实例，它的自定义事件有如下几种
//+ listening: 调用 server.listen() 绑定端口或 Domain Socket 后触发 server.listen(port,listeningListener)
//+ connection: 客户端套接字连接到服务器端时触发 net.createServer()
//+ close: 服务器关闭时触发，调用 server.close() 后服务器停止接受新的套接字连接，并等待所有当前连接断开
//+ error: 服务器异常时触发

//2.连接事件
//每个连接事件都是典型可写可读的 Stream 对象，用于服务器与客户端之间的通信，既可以通过 data 事件读取数据，也可以通过 write 进行发送
//+ data: 当一端调用 write() 发送数据时另一端会触发 data() 事件，事件传递的数据即 write() 发送的数据
//+ end: 连接中的任意一端发送了 FIN 数据时触发
//+ connect: 用于客户端，当套接字与服务器连接成功时被触发
//+ drain: 任意一端用 write() 发送数据时，该端触发
//+ error: 异常时触发
//+ close: 套接字完全关闭时触发、
//+ timeout: 一定事件后连接不再活跃时触发，通知用户当前该连接已经被闲置

//TCP 套接字是可写可读的 Stream 对象，可以利用 pipe() 方法实现管道操作
//实现 echo 服务器
/* const net = require('net');
const server = net.createServer((socket)=>{
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});
server.listen(1337, '127.0.0.1'); */

//+++++ UDP +++++
//UDP：用户数据包协议(同样属于网络传输层)，与 TCP 最大的不同是 UDP 不是面向连接的：
//TCP 一旦建立连接，所有的会话都基于连接完成，若要与另一个 TCP 服务通信需另创建一个套接字来完成连接。
//UDP 一个套接字可以与多个 UDP 服务通信，它提供面向事务的简单不可靠信息传输服务，在网络差时可能丢包严重。
//UDP 由于无须连接，资源消耗低，处理快速且灵活，常用于音频、视频等，DNS 服务即是基于 UDP 实现的。

//UDP 套接字一旦创建，既可以作为客户端发送数据，也可以作为服务端接受数据：
/* const dgram = require('dgram');
// const socket = dgram.createSocket("udp4"); //创建 UDP 套接字
//--- 创建服务器端 ---
const server = dgram.createSocket("udp4"); //让套接字接收网络消息
server.on("message", (msg, rinfo) => {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
});

server.on("listening", () => {
    const address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

server.bind(41234);//该套接字接收所有网卡上41234端口上的消息，绑定完成后将触发 listening 事件
//--- 创建客户端 ---
const message = Buffer.from("深入浅出 Node.js");
const client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
    client.close();
}); */

//UDP 套接字事件：是 EventEmitter 实例，非 Stream 实例
//+ message: 当 UDP 套接字监听网卡端口后，接收到消息时触发，携带的数据为消息 Buffer 对象和一个远程地址信息
//+ listening: 当 UDP 套接字开始监听时触发
//+ close: 调用 close() 方法时触发并不再触发 message 事件，如需再次触发 message 事件需重新绑定
//+ error: 异常发送时触发，若不监听会直接抛出使进程退出

//+++++ HTTP +++++
//实现 HTTP 服务器 
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337');

//HTTP 超文本传输协议(应用层协议，非网络传输协议)，构建在 TCP 之上，两端为服务器和浏览器(B/S模式)
//启动上面的服务端代码，采用 curl -v 显示网络通讯的所有报文信息(报文头，报文体)
// *   Trying 127.0.0.1...
// * TCP_NODELAY set
// * Connected to 127.0.0.1 (127.0.0.1) port 1337 (#0) //1. TCP 3 次握手
// > GET / HTTP/1.1
// > Host: 127.0.0.1:1337
// > User-Agent: curl/7.64.1
// > Accept: */*  //2. 客户端向服务器端发送请求报文
// > 
// < HTTP/1.1 200 OK
// < Content-Type: text/plain
// < Date: Sun, 28 Feb 2021 06:21:52 GMT
// < Connection: keep-alive
// < Keep-Alive: timeout=5
// < Transfer-Encoding: chunked
// < 
// Hello World  //3. 服务器端完成处理后向客户端发送响应内容，包括响应头和响应体
// * Connection #0 to host 127.0.0.1 left intact
// * Closing connection 0  //4. 结束会话的信息

//TCP 以 connection 为单位进行服务，HTTP 以 request 为单位进行服务
//http 模块将连接所用套接字的读写抽象为 ServerRequest 和 ServerResponse 对象
//请求产生时，http 模块拿到传来的数据，调用二进制模块 http_parser 解析报文报头后触发 request 事件调用相关业务逻辑
//1. HTTP 请求
//GET / HTTP/1.1 被解析成如下属性
//+ req.method：常见的请求方法 GET, POST, DELETE, PUT, CONNECT 等几种
//+ req.url：这里是 /
//+ req.httpVersion：值为 1.1
//其余为正常 key-value，放置在 req.headers 属性上传递给业务逻辑
//报文体部分为只读流对象，业务逻辑要在数据流结束后才能进行
function doing(req, res) {
    let buffers = [];
    req.on('data',(trunk)=>{
        buffers.push(trunk);
    }).on('end',()=>{
       let buffer = Buffer.concat(buffers);
       //TODO
       res.on('Hello world');
    });
}
//2. HTTP 响应
