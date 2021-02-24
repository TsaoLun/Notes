//---------- Buffer ----------

/* const str = "深入浅出node.js";
const buf = new Buffer.from(str, 'utf-8');
console.log(buf);

const buff = new Buffer.alloc(100);
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
//TCP：传输控制协议(面向连接的协议，在传输之前需要3次握手形成会话)【请求连接，响应，开始传输】
//只有会话形成后，服务器端和客户端之间才能互相发送数据，创建会话的过程中两边分别提供一个套接字，通过套接字形成连接。

//创建 TCP 服务器端
const net = require('net');
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        socket.write("你好");
    });
    socket.on('end', () => {
        console.log('连接断开');
    });
    socket.write("欢迎光临《深入浅出Node.js》: \n");
});

server.listen(8124, () => {
    console.log('server bound');
});