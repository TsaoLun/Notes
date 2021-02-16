//--- this ---
//1. 作为对象的方法调用
//this 指向该对象
/* const obj = {
    a: 1,
    getA: function () {
        console.log(this === obj);
        console.log(this.a);
    }
};

obj.getA();
 */

//2. 作为普通函数调用
//this 指向全局对象
/* global.name = 'globalName';

const getName = function () {
    return this.name;
};

console.log(getName());

//在 strict 模式下 this 不会指向全局对象
function func() {
    "use strict";
    console.log( this );
}
func();//undefined 
*/

//3. 构造器调用
//JS 通过构造器创建函数和 new 运算符模拟类
//构造器里的 this 指向 new 时返回的这个对象

/* const MyClass = function () {
    this.name = 'sven';
    //如果显式返回一个 object 则返回该对象
    return {
        name: 'anne'
    };
};
const obj = new MyClass();
console.log(obj.name); //anne
 */

//如果构造器返回非对象类型的数据则不会产生问题
/* const MyClass = function () {
    this.name = 'sven';
    return 'anne';
};

let obj = new MyClass();
console.log(obj.name);

//Function.prototype.call 动态传入 this
//Function.prototype.apply 动态传入 this
const obj1 = {
    name: 'sven',
    getName: function () {
        return this.name;
    }
};

const obj2 = {
    name: 'anne'
};

console.log(obj1.getName());
console.log(obj1.getName.call(obj2));
 */
//call, apply 对于函数式编程很重要

//丢失的 this 
/* const obj = {
    myName: 'sven',
    getName: function () {
        return this.myName;
    }
}; */

//getName 作为 obj 对象的属性被调用
//此时 this 指向的是 obj，输出 'sven'
/* console.log(obj.getName());//sven

const getName2 = obj.getName;
console.log(getName2());//undefined
//而 getName2 引用 obj.name() 是普通函数方式，this 为 global 

const getName3 = obj.getName();//将调用结果赋给 getName3
console.log(getName3); */

//--- call & apply ---

//apply 第一个参数为函数体内 this 对象的指向
//      第二个参数为带下表的集合
/* const func = function (a, b, c) {
    console.log([a, b, c]);
};

func.apply(null, [1, 2, 3]); */

//call 第二个参数开始依次传入
/* const func = function(a, b, c) {
    console.log([a, b, c]);
};
func.call(null, 1, 2, 3, 4); */

//apply 和 call 第一个参数为 null，则 this 指向宿主对象 (global)
/* const func = function(a, b, c){
    console.log(this===global);
};
func.apply(null,[1, 2, 3]); */
//严格模式下 this 依旧为 null

//传入 null 替换具体对象
/* console.log(Math.max(1, 2, 5, 3));
let arr = [1, 2, 5, 3];
console.log(Math.max(arr));
console.log(Math.max.apply(null, arr));
console.log(Math.max(...arr)); */

//---call apply 用途---
//1. 改变 this 指向
/* const obj1 = {
    name: 'sven'
};

const obj2 = {
    name: 'anne'
};

global.name = 'globalName';

const getName = function(){
    console.log(this.name);
};

getName();
getName.call(obj1);
getName.call(obj2); */

//2. Function.prototype.bind 用来指定函数内部 this 指向
// Function.prototype.bind = function (context) {
//     const self = this;
//     return function () {
//         return self.apply(context, arguments);
//     };
// };

//3. 借用构造函数
const A = function (name) {
    this.name = name;
};
const B = function () {
    A.apply(this, arguments);
};//A 的 this 指向 B ，可通过 B 的参数设置 B 的 name
B.prototype.getName = function () {
    return this.name;
};

let b = new B('sven');
console.log(b.getName());

//Array.prototype.push
(function () {
    Array.prototype.push.call(arguments, 3);
    console.log(arguments);
})(1, 2);

//把任意对象传入 Array.prototype.push
const a = {};
Array.prototype.push.call(a, 'first', 'second');

console.log(a.length);
console.log(a[0]);
console.log(a[1]); 
console.log(a[2]);
console.log(a); //{ '0': 'first', '1': 'second', length: 2 }