//监听 POST 请求和处理 POST 的服务器(客户端在node4.js 38)
var http = require('http');
var querystring = require('querystring');
var server = http.createServer().listen(8124);

server.on('request', function (request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = querystring.parse(body);
            console.log(post);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('Hello World\n');
        });
    }
});
console.log('server listening on 8214');