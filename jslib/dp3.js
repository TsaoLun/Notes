//----- 闭包和高阶函数 -----

//--- 闭包 closure ---
//函数可以用来创造函数作用域
/* let a = 1;
const func1 = function () {
    let b = 2;
    const func2 = function () {
        let c = 3;
        console.log(b);
        console.log(a);
    };
    func2();
    console.log(c);
};
func1();//c is not defined */

//变量的生存周期
//局部变量在函数调用后被销毁
/* const func = function () {
    let a = 1;
    return function () {
        a++;
        console.log(a);
    };
};
const f = func();

f();
f();
f();
f(); */

//退出函数后局部变量 a 没有消失
//因为 const f = func() **返回匿名函数的引用 return function**
//它访问到被调用的环境的局部变量 a，局部变量所在的环境还能被外界访问就不会被销毁
//这里产生了一个闭包结构，局部变量的生命看起来被延续了

//1. 封装变量
/* const mult = function () {
    let a = 1;
    for (let i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}; */
// console.log(mult(3,4)); //12

//加入缓存机制提高函数性能 
//将 cache 封闭在 mult 函数内部
/* const mult = (function () {
    const cache = {};
    return function () {
        const args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return cache[args] = a;
    };
})();

console.log(mult(1,2,3));
console.log(mult(1,2,3)); */

//2. 延续局部变量生命
// img 被销毁，请求丢失
// const report = function(src){
//     let img = new Image();
//     img.src = src;
// };

//将 img 用闭包封闭
/* const report = (function(){
    let imgs = [];
    return function(src){
        let img = new Image();
        imgs.push(img);
        img.src = src;
    };
})(); */

//闭包与面向对象设计
//闭包
/* const extent = function(){
    let value = 0;
    return {
        call: function(){
            value++;
            console.log(value);
        }
    };
};
const extentClosure = extent();
extentClosure.call();
extentClosure.call();
extentClosure.call();
 */

//面向对象 this
/* const extent = {
    value: 0,
    call: function(){
        this.value++;
        console.log(this.value);
    }
};
extent.call();
extent.call();
extent.call(); */

//或者
/* const Extent = function () {
    this.value = 0;
};
Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
};
let extent = new Extent();

extent.call();
extent.call();
extent.call(); */
//闭包可通过将变量设为 null 避免内存浪费以及循环引用

//--- 高阶函数 ---
//1. 函数作为参数传递
//Array.prototype.sort
/* let arr1 = [1, 4, 3].sort( function(a, b){
    return a - b;
});
console.log(arr1);//[ 1, 3, 4 ]

let arr2 = [1, 4, 3].sort( function(a, b){
    return b - a;
});
console.log(arr2);//[ 4, 3, 1 ] */

//2. 函数作为返回值输出
//意味着运算过程是可延续的
//根据 Object.prototype.toString.call( obj ) 编写 isType 函数
/* const isString = function(obj){
    return Object.prototype.toString.call(obj) === '[object String]';
};
const isArray = function(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
};
const isNumber = function(obj){
    return Object.prototype.toString.call(obj) === '[object Number]';
};
 */

//把字符串作为参数提前植入 isType 函数
/* const isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
};

const isString = isType('String');
const isArray = isType('Array');
const isNumber = isType('Number');

console.log(isArray([1,2,3])); */

//getSingle 单例模式
/* const getSingle = function (fn) {
    let ret;
    return function () {
        return ret || (ret = fn.apply(this, arguments));
    };
};
//即把函数当参数，又让函数执行后返回了另一个函数
const getScript = getSingle(function () {
    return document.createElement('script');
});

const script1 = getScript();
const script2 = getScript();

console.log(script1 === script2); */

//高阶函数实现 AOP 面向切面编程
//Function.prototype 把一个函数动态织入到另一个函数中 
Function.prototype.before = function(beforefn){
    const __self = this; //保存原函数的引用
    return function(){ //返回包含了原函数和新函数的“代理”函数
        beforefn.apply(this, arguments); //执行新函数，修正 this
        return __self.apply(this, arguments); //执行原函数
    };
};

Function.prototype.after = function( afterfn ){
    const __self = this;
    return function(){
        const ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    };
};