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
//async 用于声明异步函数