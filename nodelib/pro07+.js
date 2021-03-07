//---------- 构建 WebSocket 服务 ----------
//1. WebSocket 客户端基于事件的编程模型与 Node 相似
//2. WebSocket 实现客户端与服务器之间的长连接，Node 事件驱动擅长与大量客户端保持高并发连接
//WebSocket 协议相比 HTTP 的优点：
//1. 客户端与服务器只需建立一个 TCP 连接即可完成双向通信
//2. WebSocket 服务器端可以推送数据到客户端，比请求响应模式更灵活高效
//3. 协议头轻量级，减少数据传送量

//WebSocket 客户端示例
const getUpdateData = () => { };
const socket = new WebSocket('ws://127.0.0.1:12010/updates');
socket.onopen = () => {
    setInterval(() => {
        if (socket.bufferedAmount == 0)
            socket.send(getUpdateData());
    }, 50);
};
socket.onmessage = function (event) {
    //TODO
};
//WebSocket 握手
//Upgrade: websocket
//Connection: Upgrade
//Sec-WebSocket-Key 通过 sha1 安全散列算法计算与 Base64 编码后最后返回给客户端
const crypto = require('crypto');
let key;
const val = crypto.createHash('sha1').update(key).digest('base64');
//服务端在处理完请求后响应报文，客户端校验响应报文中的 Sec-WebSocket-Accept 的值并进行数据传输

//TLS/SSL 公钥/私钥