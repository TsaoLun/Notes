//---------- 路由解析 ----------
//1. 文件路径
//2. MVC
//3. RESTful

//----- MVC -----
//+ 控制器(Controller)，一组行为的集合
//+ 模型(Model)，数据相关的操作和封装
//+ 视图(View)，视图的渲染

//1. 路由解析，根据 URL 寻找到对应的控制器和行为
//2. 行为调用相关模型，进行数据操作
//3. 数据操作结束后调用视图和相关数据进行页面渲染，输出到客户端

//根据 URL 做路由映射 1. 通过手工关联(路由文件) 2. 自然关联

//----- RESTful -----
//请求方法作为逻辑分发的单元，REST: Representational State Transfer (表现层状态转化)
//设计哲学：将服务器端提供的内容实体看作一个资源，并表现在 URL 上

//过去对用户的增删改查的操作行为 URL 如下：
//POST /user/add?username=jack
//GET /user/remove?username=jack
//POST /user/update?username=jack
//GET /user/get?username=jack

//在 RESTful 设计中，DELETE 和 PUT 请求方法被引入设计中：
//POST /user/jack
//DELETE /user/jack
//PUT /user/jack
//GET /user/jack
//通过 URL 设计资源、请求方法定义资源的操作，通过 Accept 决定资源的表现形式

// RESTFUL特点包括：
// 1、每一个URI代表1种资源；
// 2、客户端使用GET、POST、PUT、DELETE4个表示操作方式的动词对服务端资源进行操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源；
// 3、通过操作资源的表现形式来操作资源；

//改进后的请求方法
// const routes = { 'all': [] };
// const app = {};
// const pathRegexp = () => { };
// app.use = function (path, action) {
//     routes.all.push([pathRegexp(path), action]);
// };

// ['get', 'put', 'delete', 'post'].forEach((method) => {
//     routes[method] = [];
//     app[method] = (path, action) => {
//         routes[method].push([pathRegexp(path), action]);
//     };
// });

//匹配部分
// const match = (pathname, routes) => {
//     for (let i = 0; i < routes.length; i++) {
//         let route = routes[i];
//         let reg = route[0].regexp;
//         let keys = route[0].keys;
//         let matched = reg.exec(pathname);
//         if (matched) {
//             let params = {};
//             for (let i = 0, l = keys.length; i < 1; i++) {
//                 let value = matched[i + 1];
//                 if (value) {
//                     params[keys[i]] = value;
//                 }
//             }
//             req.params = params;

//             let action = route[1];
//             action(req, res);
//             return true;
//         }
//     }
//     return false;
// };

//---------- 中间件 middleware ----------
//简化和隔离基础设施与业务逻辑之间的细节，以提升开发效率，比如 HTTP 请求细节处理的中间件等等
//中间件的上下文是请求对象 req 和响应对象 res，还需在当前中间件处理完成后通知下一个中间件执行，即尾触发的 Connect 设计
const url = require('url');
const app = () => { };
const middleware = (req, res, next) => {
    //TODO
    next();
};
//querystring, cookie, session 中间件
const querystring = (req, res, next) => {
    req.query = (new URL(req.url)).query;
    next();
};
//cookie 解析中间件
const cookie = (req, res, next) => {
    const cookie = req.headers.cookie;
    const cookies = {};
    if (cookie) {
        let list = cookie.split(';');
        for (let i = 0; i < list.length; i++) {
            let pair = list[i].split('=');
            cookies[pair[0].trim()] = pair[1];
        }
    }
    req.cookies = cookies;
    next();
};
//组织中间件
app.use = (path) => {
    let handle = {
        path: ''
    };
};