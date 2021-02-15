//--- 递归 ---
/* function factorialIterative(number) {
    if (number < 0) return undefined;
    let total = 1;
    for (let n = number; n > 1; n--) {
        total = total * n;
    }
    return total;
}
// function factorialIterative(number) {
//     if (number < 0) return undefined;
//     let total = 1;
//     for (let n = 1; n < number + 1; n++) {
//         total = total * n;
//     }
//     return total;
// }
console.log(factorialIterative(5));

function factorial(n) {
    if (n === 1 || n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}
console.log(factorial(5)); */
//当 factorial(1) 返回时调用栈开始弹出调用，返回结果直到最终结果被计算出来

//--- 斐波那契数 ---
//1. 迭代法 (最快)
function fibonacciIterative(n) {
    if (n < 1) return 0;
    if (n <= 2) return 1;
    let fibNMinus2 = 0;
    let fibNMinus1 = 1;
    let fibN = n;
    for (let i = 2; i <= n; i++) {
        fibN = fibNMinus1 + fibNMinus2; //f(n-1)+f(n-2)
        fibNMinus2 = fibNMinus1;
        fibNMinus1 = fibN;
    }
    return fibN;
}

//2. 递归法
function fibonacci(n) {
    if (n < 1) return 0;
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

//3. 记忆化
function fibonacciMemoization(n) {
    const memo = [0, 1];
    const fibonacci = (n) => {
        if (memo[n] != null) return memo[n];
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
        //memo[2] = fibonacci(1, memo) + fibonacci(0, memo); // 0 + 1
    };
    return fibonacci(n);
}

function time(func, n) {
    const start = new Date();
    console.log(func.name);
    console.log(func(n));
    console.log(new Date - start);
    console.log('----------');
}

time(fibonacci, 35);
time(fibonacciIterative, 35);
time(fibonacciMemoization, 35);