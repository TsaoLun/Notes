//--- 数组 --- 
//splice
/* let numbers = [1, 3, 54];
numbers.splice(2,0,1,2,3);
//第一个参数为操作的索引位置，第二个参数为删除的个数，第三位以后为插入的值
console.log(numbers); */

//concat
/* const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];
let numbers = negativeNumbers.concat(zero, positiveNumbers);
console.log(numbers); */

//数组的迭代器函数
const isEven = x => x % 2 === 0;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//every 迭代每个元素直到返回 false
console.log(numbers.every(isEven));
//some 会迭代每个元素直到返回 true
console.log(numbers.some(isEven));
//forEach 
//map 返回每个元素的函数处理结果
console.log(numbers.map(isEven));
//filter 只返回使函数为 true 的元素
console.log(numbers.filter(isEven));
//reduce
//接受 previousValue, currentValue, index 和 array (后两者可选)
//返回一个将被叠加到累加器的值，reduce 方法停止后返回这个累加器
let reduceNumbers = numbers.reduce((previous, current) => previous + current);
console.log(reduceNumbers);

//ES6
//for...of 迭代数组
for (const n of numbers) {
    console.log(n % 2 === 0 ? 'even' : 'odd');
}
//Array 的 @@iterator 属性，通过 Symbol.iterator 访问
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
