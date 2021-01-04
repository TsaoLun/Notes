//--- 模块 ---
/* const math = require('./math');
exports.increment = function (val) {
    return math.add(val, 1);
}; */

//module.exports 的作用
//exports 对象通过形参方式传入，直接赋值会改变形参的引用，但不能改变作用域外的值
const change = function (a) {
    a = 100;
    console.log(a);
};

let a = 10;
change(a);
console.log(a);
//如果要达到 require 引入一个类的效果，需赋值给 module.exports 对象

//--- 核心模块 ---
//V8 通过 js2c.py 将 JS 代码转换成 C++ 的数组并生成 node_natives.h 头文件
//JS 代码先以字符串的形式存储在 node 命名空间中（不可执行），在启动 Node 进程时再加载进内存并经标识符分析后直接定位到内存中

//node_extensions.h 将核心内建模块（C/C++）统一放进 node_module_list 数组中
//如 node_buffer, node_crypto 等等，并提供 get_builtin_module 方法取出模块
//Node 在启动时会生成一个全局 process 并提供 Binding() 方法协助加载内建模块
//核心文件转换为 C/C++ 数组存储后通过 process.binding('natives') 取出放置于 NativeModule._source 