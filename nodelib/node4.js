//---Node 和 Web---

/* //---HTTP 模块---
var http = require('http');
var server = http.createServer().listen(8124);

server.on('request', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
});

console.log('server listening on 8124'); 

//监听 POST 请求 && 处理 POST 数据的服务器
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
console.log('server listening on 8214');*/

/* //HTTP 客户端发送数据到服务器
var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'msg': 'Hello World'
});

var options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cotent-Length': postData.length
    }
    //agent: false //禁止连接池以解除瓶颈，也可以修改最大值agent.maxFreeSockets
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    
    //get data as chunks
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });

    //end response
    res.on('end', function () {
        console.log('No more data in response.');
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
});

req.write(postData);
req.end(); */

//创建静态网站服务器
var http = require('http'),
    fs = require('fs'),
    base = '/home/lun/Notes/jslib/jsio.html';

http.createServer(function (req, res) {
    let pathname = base + req.url;
    console.log(pathname);

    fs.stat(pathname, function (err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.write('Resource missing 404\n');
            res.end();
        } else {
            res.setHeader('Content-Type', 'text/html');

            var file = fs.createReadStream(pathname);

            file.on("open", function () {
                res.statusCode = 200;
                file.pipe(res);
            });

            file.on("error", function (err) {
                console.log(err);
                res.writeHead(403);
                res.write('file missing or permission problem');
                res.end();
            });
        }
    });
}).listen(8124);

console.log('Server web running at 8124');
