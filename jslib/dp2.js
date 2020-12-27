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
const obj = {
    myName: 'sven',
    getName: function () {
        return this.myName;
    }
};

//getName 作为 obj 对象的属性被调用
//此时 this 指向的是 obj，输出 'sven'
console.log(obj.getName());//sven

const getName2 = obj.getName;
console.log(getName2());//undefined
//而 getName2 引用 obj.name() 是普通函数方式，this 为 global 

const getName3 = obj.getName();//将调用结果赋给 getName3
console.log(getName3);

//--- call & apply ---

