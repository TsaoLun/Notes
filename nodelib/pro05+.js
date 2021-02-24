//---------- 高效使用内存 ----------
//1. 标识符查找 
//2. 作用域链(变量名向上级作用域查找)
//3. 主动释放
//全局变量引用的对象将常驻在老生代中，只有在 delete 或重新赋值后(让旧对象脱离引用关系)，才会在下次GC被回收释放。
//V8 中通过 delete 删除对象的属性可能会干扰 V8 的优化，所以通过赋值解除引用更好(global.foo = undefined or null)
/* const foo = { name: 'Jack' };
console.log(foo);
foo.name = undefined;
console.log(foo);
delete foo.name;//不妥？
console.log(foo); */

//----- 闭包 -----
//(function(){...}())或(function(){...})()立即执行
const foo1 = function () {
    let local = "局部变量";
    (() => {
        console.log(local);
    })();
};
foo1();

const foo2 = function () {
    let local = "局部变量";
    (function () {
        console.log(local);
    })();
};
foo2();

//闭包：通过函数可以作为返回值，实现在外部作用域访问内部变量
const fooClosure = () => {
    let bar = () => {
        let local = "局部变量";
        return () => {//返回匿名函数or箭头函数
            return local;//在匿名函数中返回目标内部变量
        };
        //return function(){return local}
    };
    let baz = bar();
    console.log(baz());
};
fooClosure();
//闭包的中间函数被引用后将不会被释放，作用域中的内存占用也不会被释放。

//---------- 内存泄漏 ----------
//应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象
//1. 缓存
//2. 队列消费不及时
//3. 作用域未释放

const cache = {};
const get = (key) => {
    if (cache[key]) {
        return cache[key];
    } else {
        //get from otherwise
    }
};
const set = function (key, value) {
    cache[key] = value;
};

//被执行结果按参数缓存在 memo 对象上，不被清除
// _.memoize = function (func, hasher) {
//     let memo = {};
//     hasher || (hasher = _.identity);
//     return function () {
//         let key = hasher.apply(this, arguments);
//         return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
//     };
// };

//--- 缓存限制策略 ---
//对键值数量进行限制
const LimitableMap = function (limit) {
    this.limit = limit || 10;
    this.map = {};
    this.keys = [];
};

let hasOwnProperty = Object.prototype.hasOwnProperty;

LimitableMap.prototype.set = function(key, value) {
    let map = this.map;
    let keys = this.keys;
    if (!hasOwnProperty.call(map, key)){
        if (keys.length === this.limit) {
            let firstKey = keys.shift();
            delete map[firstKey];
        }
        keys.push(key);
    }
    map[key] = value;
};

LimitableMap.prototype.get = function(key){
    return this.map[key];
};