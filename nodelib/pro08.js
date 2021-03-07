//---------- Web 应用 ----------
//+ 请求方法的判断
//+ URL 的路径解析
//+ URL 中查询字符串解析
//+ Cookie 的解析
//+ Basic 的认证
//+ 表单数据的解析
//+ 任意格式文件的上传处理

//HTTP_Parser 在解析请求报文时将报文头抽取出来，设置为 req.method
//通常只需处理 GET 和 POST 两类请求，但在 RESTful 类 Web 服务中请求方法会决定资源的操作行为
//PUT 代表新建资源，POST 表示更新资源，GET 表示查看资源，DELETE 表示删除资源
function (req, res) {
    switch (req.method) {
        case 'POST':
            update(req, res);
            break;
        case 'DELETE':
            remove(req, res);
            break;
        case 'PUT':
            create(req, res);
            break;
        case 'GET':
        default:
            get(req, res);
    }
}

//浏览器将完整的 URL 地址解析为报文，将路径存在于报文第一行第二部分：GET /path?foo=bar HTTP/1.1
//HTTP_Parser 将其解析为 req.url，如果是静态文件服务器则会根据路径查找磁盘中的文件，将其响应给客户端
const url = require('url');
const fs = require('fs');
function (req, res) {
    let pathname = url.parse(req.url).pathname;//已弃用
    fs.readFile(path.join(ROOT, pathname), (err, file) => {
        if (err) {
            res.writeHead(404);
            res.end('找不到相关文件');
            return;
        }
        res.writeHead(200);
        res.end(file);
    });
}
//根据路径选择控制器
function (req, res) {
    let pathname = url.parse(req.url).pathname;
    let paths = pathname.split('/');
    let controller = paths[1] || 'index';
    let action = path[2] || 'index';
    let args = paths.slice(3);
    if (handles[controller] && handles[controller][action]) {
        handles[controller][action].apply(null, [req, res].concat(args));
    } else {
        res.writeHead(500);
        res.end('找不到响应控制器');
    }
}

//查询字符串，即地址栏路径后的字符串，Node 提供了 querystring 用于处理这部分数据
const querystring = require('querystring')
const query = querystring.parse(url.parse(req.url).query);
//它将 foo=bar&baz=val 解析为一个 JSON 对象
// {
//     foo: 'bar',
//     baz: 'val'
// }
//注意 foo=bar&foo=val 这种键出现多次的值为数组 ['bar', 'val']

//----- Cookie -----
//1. 服务器向客户端发送 Cookie
//2. 浏览器将 Cookie 保存
//3. 每次浏览器都将 Cookie 发向服务器
//HTTP_Parser 会将所有的报文字段解析到 req.headers 上，那么 Cookie 就是 req.headers.cookie
//Cookie 值的格式是 key=value; key2=value2 形式的，解析它如下:
const parseCookie = function (cookie) {
    let cookies = {};
    if (!cookie) {
        return cookies;
    }
    let list = cookie.split(';');
    for (let i = 0; i < list.length; i++) {
        let pair = list[i].split('=');
        cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
}

//----- Session -----
//浏览器每次发送 Cookie 一个是体积问题，Cookie 还能在前后端修改，任意发生篡改和伪造
//Session 数据只保留在服务器端，而实现数据一一对应的方式有两种

//1. 基于 Cookie 实现用户和数据的映射
//Cookie 中只存放口令，一旦被篡改即丢失映射关系
//一旦服务器检查到用户请求 Cookie 中没有携带某个值，就生成唯一值并设定超时时间
const sessions = {};
const key = 'session_id';
const EXPIRES = 20 * 60 * 1000;
const generate = ()=>{
    let session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
};

//每个请求到来时，检查 Cookie 中的口令与服务器端的数据，若过期则重新生成
function (req, res) {
    let id = req.cookies[key];
    if(!id) {
        req.session = generate();
    } else {
        let session = sessions[id];
        if(session) {
            if(session.cookie.expire > (new Date()).getTime()){
                //更新超时时间
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } else {
                //超时则删除旧数据并重新生成
                delete sessions[id];
                req.session = generate();
            }
        } else {
            //口令不对则重新生成 session
            req.session = generate();
        }
    }
    handle(req, res);
}
//响应给客户端时设置新的值(hack 响应对象的 writeHead 方法)
let writeHead = res.writeHead;
res.writeHead = ()=>{
    let cookies = res.getHeader('Set-Cookie');
    let session = seriallize(key, req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookie, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
};

//2. 通过查询字符串来实现浏览器和服务器端数据的对应(复制地址即复制身份，存在风险)
const getURL = (_url, key, value) => {
    let obj = url.parse(_url, true);
    obj.query[key] = value;
    return url.format(obj);
} 

//----- Session 与内存 -----
//Session 数据存储于内存中会引起性能问题，常用方案是 Redis, Memcached 这些高效缓存
//由此产生的网络访问会导致速度变慢，但优势如下：
//+ Node 与缓存服务保持长连接，握手的延迟只影响初始化
//+ 高速缓存直接在内存中进行数据存储和访问
//+ 缓存服务通常与 Node 进程运行在相同的地方，网速收到影响小

//----- Session 与安全 -----
//无论是 Cookie 还是查询字符串，Session 口令依然保存在客户端，存在安全问题
//1. 将这个口令通过私钥加密处理，甚至将客户端某些独有信息与口令一起加密
//2. XSS 即跨站脚本攻击，即用户的输入没有被转义而是直接执行，篡改后的URL可被用来窃取用户 Session 口令并伪造 Cookie