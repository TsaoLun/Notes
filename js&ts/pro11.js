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
//三种状态 私有且不可逆 pending, fulfilled (resolved), rejected

//期约两大用途：
//1. 抽象地表示一个异步操作，比如 HTTP 200～299 兑现，否则拒绝
//2. 期约封装的异步操作会生成一个状态改变时可访问的值，JSON 字符串或者包含 HTTP 状态码和错误消息的 Error 对象

//resolve() reject() 执行函数控制期约状态
/* let p1 = new Promise((resolve, reject) => resolve());
setTimeout(console.log, 0, p1);

let p2 = new Promise((resolve, reject) => reject());
setTimeout(console.log, 0, p2); */

//执行函数是同步执行的，作为期约的初始化程序
/* new Promise(() => setTimeout(console.log, 0, 'executor'));
setTimeout(console.log, 0, 'promise initialized');
//可通过 setTimeout 推迟切换状态
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
setTimeout(console.log, 0, p); */
//打印时为 pending 而不是 resolve

//状态不可切换
/* let p = new Promise((resolve, reject) => {
    resolve();
    reject(); //无效
});
setTimeout(console.log, 0, p); */

//待定状态定时退出
/* let p = new Promise((resolve, reject) => {
    setTimeout(reject, 10000);// 10 秒后 reject()
});

console.log(p);//pending
setTimeout(console.log, 0, p); //pending
setTimeout(console.log, 11000, p); //reject */

//Promise.resolve() 实例化一个非 pending 解决的期约
/* let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();//等效

//把任何值转化为期约
setTimeout(console.log, 0, Promise.resolve());//Promise {undefined}
setTimeout(console.log, 0, Promise.resolve(3));//Promise {3} */
//Promise.reject() 类似

//--- 期约的实例方法 ---
//ES 异步结构中，任何对象都有 then() 方法

//访问异步操作返回的数据，处理期约成功失败输出，连续对期约求值，添加只有期约终止状态才执行的代码
//Promise.prototype.then()
//then 方法接受最多两个参数，onResolved 兑现和 onRejected 拒绝

//1. 期约连锁
//效果类似于同步任务
/* let p = new Promise((resolve, reject) => {
    console.log('first');
    resolve();
});
p.then(() => console.log('second'))
 .then(() => console.log('third'))
 .then(() => console.log('fourth')); */

//改写，每个执行器返回一个期约实例，让后续期约等待之前的期约
/* let p1 = new Promise((resolve, reject) => {
    console.log('p1 executor');
    setTimeout(resolve, 1000);
});
p1.then(() => new Promise((resolve, reject) => {
    console.log('p2 executor');
    setTimeout(resolve, 1000);
}))
    .then(() => new Promise((resolve, reject) => {
        console.log('p3 executor');
        setTimeout(resolve, 1000);
    })); */

//把生成期约的代码提取到一个工厂函数中
/* function delayedResolve(str) {
    return new Promise((resolve, reject) => {
        console.log(str);
        setTimeout(resolve, 1000);
    });
}
delayedResolve('p1 executor')
  .then(()=>delayedResolve('p2 executor'))
  .then(()=>delayedResolve('p3 executor'))
  .then(()=>delayedResolve('p4 executor')); */

//否则回调嵌套
/* function delayedExecute(str, callback = null) {
    setTimeout(() => {
        console.log(str);
        callback && callback();
    }, 1000);
}
delayedExecute('p1 callback', ()=>{
    delayedExecute('p2 callback', ()=>{
        delayedExecute('p3 callback', ()=>{
            delayedExecute('p4 callback');
        });
    });
}); */

//then(), catch(), finally() 都返回期约，所以串联起来很直观
/* let p = new Promise((resolve, reject) => {
    console.log('initial promise rejects');
    reject();
});
p.catch(() => console.log('reject handler'))
    .then(() => console.log('resolve handler'))
    .finally(() => console.log('finally handler')); */

//2. 期约图
//利用期约连锁构建有向非循环图(二叉树)
//   |E
// |B|D
//A| 
// |C|F
//   |G

/* let A = new Promise((resolve, reject) => {
    console.log('A');
    resolve();
});
let B = A.then(() => console.log('B'));
let C = A.then(() => console.log('C'));

B.then(() => console.log('D'));
B.then(() => console.log('E'));
C.then(() => console.log('F'));
C.then(() => console.log('G'));
 */

//3. Promise.all() & Promise.race()
//-- Promise.all() 接受一个可迭代对象，会在一组期约全部解决后再解决 --
/* let p1 = Promise.all([
    Promise.resolve(),
    Promise.resolve()
]);

//可迭代对象中的元素会通过 Promise.resolve() 转换为期约
let p2 = Promise.all([3, 4]);

//空的可迭代对象等价于 Promise.resolve()
let p3 = Promise.all([]); */

//合成的期约只会在每个包含的期约都解决后才解决
//若有一个期约拒绝则合成的也是拒绝

//Promise.race() 接受一个可迭代对象，返回一个包装期约(第一个落定的期约)

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

//--- 串行执行期约 ---
/* function addTwo(x) { return x + 2; }
function addThree(x) { return x + 3; }
function addFive(x) { return x + 5; }
async function addTen(x) {
    for (const fn of [addTwo, addThree, addFive]){
        x = await fn(x);
    }
    return x;
}
addTen(9).then(console.log); */
//await 传递了每个函数的返回值

//换为期约，把所有函数改为异步，结果不变
/* async function addTwo(x) { return x + 2; }
async function addThree(x) { return x + 3; }
async function addFive(x) { return x + 5; }

async function addTen(x) {
    for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x);
    }
    return x;
}

addTen(9).then(console.log); */

//栈追踪与内存管理
//异步和期约功能有重叠，但内存中的差别很大，下例展示了拒绝期约的栈追踪信息
/* function fooPromiseExecutor(resolve, reject) {
    setTimeout (reject, 1000, 'bar');
}
function foo() {
    new Promise(fooPromiseExecutor);
}
foo(); */
//错误信息包含嵌套函数函数的标识符，即被调用以创建最初期约实例的函数
//若 await new Promise() 栈追踪会反应当前的调用栈，不会带来额外消耗
