//----- 代理与反射 -----
//代理类似指针，用作目标对象的替身但独立于目标对象
/* const target = {
    id: 'target'
};
const handler = {};
//目标对象和处理程序对象
const proxy = new Proxy(target, handler);
//id 属性会访问同一个值
console.log(target.id);
console.log(proxy.id);

//给目标属性赋值会反映在两个对象上
proxy.id = 'foo';
console.log(target.id);
console.log(proxy.id);

//给代理属性赋值会反映在两个对象上
proxy.id = 'bar';
console.log(target.id);
console.log(proxy.id);
 */
//hasOwnProperty()方法在两个地方
//Proxy.prototype 是 undefined 因此不能用 instanceof
//严格相等可以用来区分代理和目标

//--- 定义捕获器 trap ---
//定义 get() 捕获器
/* const target = {
    foo: 'bar'
};
const handler = {
    get() {
        return 'handler override';
    }
};
const proxy = new Proxy(target, handler);

//只有在代理对象上操作才会触发捕捉器
console.log(target.foo);//bar
console.log(proxy.foo);//handle override

console.log(target['foo']);
console.log(proxy['foo']);

console.log(Object.create(target)['foo']);
console.log(Object.create(proxy)['foo']); */

//---捕获器参数---
const target = {
    foo: 'bar'
};
const handler = {
    get(trapTarget, property, receiver) {
        console.log(trapTarget === target);
        console.log(property);
        console.log(receiver === proxy);
    }
}