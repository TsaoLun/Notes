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
/* const isEven = x => x % 2 === 0;
let numbers = [1, 2, 3, 4, 5];
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
console.log(iterator.next().value); //undefined

iterator = numbers[Symbol.iterator]();
for (const n of iterator) {
    console.log(n);
} 

const arr = [1, 2, 3];
console.log(arr.join('-'));//1-2-3*/

//类型数组
/* let length = 5;
let int16 = new Int16Array(length);//16位二进制补码整数
console.log(int16); //Int16Array(5) [ 0, 0, 0, 0, 0 ]

let array16 = [];
array16.length = length;
console.log(array16); //[ <5 empty items> ]

for (let i = 0; i < length; i++){
    int16[i] = i + 1;
}
console.log(int16); */

//--- Stack ---
//后进先出 LIFO

class Stack {
    constructor() {
        this.items = [];
    }
    //push 添加元素到栈顶，即末尾

    push(element) {
        this.items.push(element);
    }

    //从 栈顶（末尾）移除元素
    pop() {
        return this.items.pop();
    }

    //查看栈顶元素
    peek() {
        return this.items[this.items.length - 1];
    }

    //检查栈是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    //清空
    clear() {
        this.items = [];
    }
}

/*const stack = new Stack();
console.log(stack.isEmpty());

stack.push(5);
stack.push(8);

console.log(stack.peek());//8

stack.push(11);
console.log(stack.size());//3
console.log(stack.isEmpty());

stack.pop();
stack.pop();
console.log(stack.size());//1 */

//--- 基于 JS 对象 的 Stack 类 ---
/* class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    size() {
        return this.count;
    }
    isEmpty() {
        return this.count === 0;
    }
    pop() {
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    clear() {
        this.items = {};
        this.count = 0;
    }
    toString(){
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

//保护数据结构内部元素
const stack = new Stack();
console.log(Object.getOwnPropertyNames(stack));
console.log(Object.keys(stack));
console.log(stack.count); */

//Symbol 实现类也不能实现
/* const _items = Symbol('stackItems');
class Stack {
    constructor(){
        this[_items] = [];
    }
}*/

//WeakMap 实现类
/* const items = new WeakMap();

class Stack {
    constructor(){
        items.set(this, []);
    }
    push(element){
        const s = items.get(this);
        s.push(element);
    }
    pop(){
        const s = items.get(this);
        const r = s.pop();
        return r;
    }
} */

//十进制到二进制与栈
/* function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while (number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }

    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

console.log(decimalToBinary(10090)); */

//进制转换算法
function baseConverter(decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let binaryString = '';

    if (!(base >= 2 && base <= 36)) {
        return '';
    }

    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    while (!remStack.isEmpty()) {
        binaryString += digits[remStack.pop()];
    }

    return binaryString;
}

console.log(baseConverter(10090, 36));