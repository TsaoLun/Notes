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
//按顺序调用三个函数，但输出顺序相反
/* async function foo() {
    console.log(await Promise.resolve('foo'));
}
async function bar() {
    console.log(await 'bar');
}
async function baz() {
    console.log('baz');
}
foo();
bar();
baz(); */
// baz
// foo
// bar

//--- 同步异步 ---
//async 标识符
//await 起作用
//JS 运行时碰到 await 关键字时会记录哪里暂停执行
//即便后面跟着立即可用的值，其余部分也会被异步求值

/* async function foo() {
    console.log(2);
    await null;
    console.log(4);
}
console.log(1);
foo();
console.log(3); */

//打印顺序：1234
//打印1后执行异步函数并打印2，await 暂停执行向消息队列中添加任务
//foo() 退出，打印3，同步线程执行完毕
//JS 运行时从消息队列中取出任务，恢复异步函数执行
//await 取得 null 值，打印 4, foo() 返回

//若 await 后面是期约，为了执行异步函数，实际上会有两个任务被添加到消息队列并被异步求值
/* async function foo() {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}

async function bar() {
    console.log(4);
    console.log(await 6);
    console.log(7);
}

console.log(1);
foo();
console.log(3);
bar();
console.log(5); */
// 1
// 2
// 3
// 4
// 5
// 8
// 9
// 6
// 7
// 先同步（以及异步函数中 await 之前的同步部分），再异步

//--- 策略 ---
//1. 箭头函数实现 sleep
/* async function sleep(delay) {
    return new Promise((r) => setTimeout(r, delay));
}

async function foo() {
    const t0 = Date.now();
    await sleep(1500);
    console.log(Date.now() - t0);
}
foo(); */

//2. 平行执行
/* async function randomDelay(id) {
    //延迟 0 ~ 1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}  */

//多次 await
/* async function foo() {
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo(); */

//for 循环
/* async function foo() {
    const t0 = Date.now();
    for (let i = 0; i < 5; ++i) {
        await randomDelay(i);
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo(); */

//forEach 不保证顺序
/* async function foo() {
    const t0 = Date.now();
    Array.from(Array(5).keys()).forEach(async(i)=>{
        await randomDelay(i);
    });
}
foo(); */
//Array(5).keys(); 返回一个包含数组中每个索引键的Array Iterator对象

//--- 不保证顺序 ---
/* async function randomDelay(id) {
    //延迟 0 ~ 1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}  */

//一次初始化所有期约，再分别等待结果
/* async function foo() {
    const t0 = Date.now();
    const p0 = randomDelay(0);
    const p1 = randomDelay(1);
    const p2 = randomDelay(2);
    const p3 = randomDelay(3);
    const p4 = randomDelay(4);
    
    await p0;
    await p1;
    await p2;
    await p3;
    await p4;

    setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
}
foo(); */

//for 循环包装
/* async function foo() {
    const t0 = Date.now();
    const promises = Array(5).fill(null).map((_,i)=>randomDelay(i));
    for (const p of promises) {
        await p;
    }
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo(); */

//注意 await 按顺序收到每个期约的值

//串行执行期约
