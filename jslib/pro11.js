//----- 期约与异步函数 -----
/* let x = 3;
setTimeout(() => { x = x + 4; console.log(x); }, 1000);
console.log(x); */

//回调函数
/* function double(value) {
    setTimeout(() => setTimeout(console.log, 0, value * 2), 1000);
}
double(3); */

//异步返回值
/* function double(value, callback) {
    setTimeout(() => callback(value * 2), 1000);
}
double(3, (x) => console.log(`I was given: ${x}`)); */

//嵌套异步回调...

//--- 期约 Promise ---
//pending, fulfilled, rejected
//同步/异步执行的二元性
/* try {
    throw new Error('foo');
} catch (e) {
    console.log(e);
}

try {
    Promise.reject(new Error('bar'));
} catch (e) {
    console.log(e);
} */
//不能用同步处理异步错误

//--- 异步函数 ---
//async/await 以同步方式写异步代码
//async 用于声明异步函数，但不改变同步求值特性
/* async function foo() {
    console.log(1);
}
foo();//1
console.log(2);//2 */

//若异步函数使用 return 返回值，该值会被 Promise.resolve() 包装为期约对象
//异步函数始终返回期约对象，在外部调用可得到它返回的期约
/* async function foo() {
    console.log(1);
    return 3;
}

//给返回的期约添加解决处理程序
foo().then(console.log);
console.log(2); */
//1
//2
//3

//也能直接返回期约对象
/* async function foo() {
    console.log(1);
    return Promise.resolve(3);
}
//给返回的期约添加处理程序
foo().then(console.log);
console.log(2); */

//若返回对象实现了 thenable 接口，可给 then() 解包
//若未实现则当作已解决的期约
//原始值
/* async function foo() {
    return 'foo';
}
foo().then(console.log);

//返回未实现 thenable 接口的对象
async function bar() {
    return ['bar'];
}
bar().then(console.log);

//返回实现了 thenable 接口的非期约对象
async function baz() {
    const thenable = {
        then(callback) { callback('baz'); }
    };
    return thenable;
}
baz().then(console.log); 

//返回一个期约
async function qux() {
    return Promise.resolve('qux');
}
qux().then(console.log); */

//与期约中一样，异步函数中抛出错误会返回拒绝的期约
/* async function foo() {
    console.log(1);
    throw 3;
}
foo().catch(console.log);
console.log(2); */

//拒绝期约的错误不会被异步函数捕获
/* async function foo() {
    console.log(1);
    Promise.reject(3);
}
foo().catch(console.log);
console.log(2); */
//1,2,UnhandledPromiseRejection

//--- await ---
//暂停异步函数代码的执行，等待期约解决

//Promise 的写法
/* let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then((x) => console.log(x)); */

//async/await 的写法
/* async function foo() {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    console.log(await p);
}
foo(); */
//await 会暂停执行异步函数后面的代码，让出 JS 运行时的执行线程

//单独使用&在表达式中用
/* async function foo() {
    console.log(await Promise.resolve('foo'));
}
foo();

async function bar() {
    return await Promise.resolve('bar');
}
bar().then(console.log);

async function baz() {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log('baz');
}
baz(); */

//await 的限制：必须在异步函数（或其定义）中使用，在同步函数中会抛出 SyntaxError

//停止和恢复执行
