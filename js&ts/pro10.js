//----- 函数 -----
//函数声明
//function sum (num1, num2) {return sum1 + sum2}
//函数表达式
/* const sum = function(num1, num2) {
    return num1 + num2;
};
console.log(sum(1,2)); */

//--- ES6 箭头函数---
/* let sum = (num1, num2) => {
  return num1 + num2;
};
console.log(sum(1, 2));

//嵌入函数
let ints = [1, 2, 3];
console.log(ints.map(i => i * 2));//隐式返回

//可以赋值
let value = {};
let setName = (x) => x.name = "Matt";
setName(value);
console.log(value.name); */

//--- 函数名：指向函数的指针 ---
/* function sum(num1, num2) {
  return num1 + num2;
}
let anotherSum = sum;
console.log(anotherSum(10, 10));

sum = null;
console.log(anotherSum(10, 10));

function foo() {}
let bar = function() {};
let baz = () => {};

console.log(foo.name);
console.log(bar.name);
console.log(baz.name);
console.log((()=>{}).name);
console.log((new Function()).name); */

//标识符前缀
/* function foo() {}
console.log(foo.bind(null).name);

let dog = {
  years: 1,
  get age() {
    return this.years;
  },
  set age(newAge) {
    this.years = newAge;
  }
};
let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, 'age');
console.log(propertyDescriptor.get.name);//get age
console.log(propertyDescriptor.set.name);//set age */

//--- 理解参数 ---
//arguments 是一个类数组对象
/* function sayHi() {
  console.log("Hello " + arguments[0] + ", " + arguments[1]);
}
sayHi("Tsaolun", "fuck off!");

//命名参数非必要
function howManyArgs() {
  console.log(arguments.length);
}
howManyArgs("string", 45);

function doAdd() {
  if (arguments.length === 1) {
    console.log(arguments[0] + 10);
  } else if (arguments.length === 2) {
    console.log(arguments[0] + arguments[1]);
  }
}
doAdd(10);
doAdd(30, 20); */

//arguments 与命名参数一起用
/* function doAdd(num1, num2) {
  if (arguments.length === 1) {
    console.log(num1 + 10);
  } else if (arguments.length === 2) {
    console.log(arguments[0] + num2);
  }
}
doAdd(10);
doAdd(30, 20); */

//默认参数作用域
/* function makeKing(name = 'Henry', numerals = 'VIII') {
  return `King ${name} ${numerals}`;
}
console.log(makeKing()); */

//参数扩展
/* let values = [1, 2, 3, 4];
function getSum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; ++i) {
    sum += arguments[i];
  }
  return sum;
}
//1. 借助 apply 方法拆分数组
console.log(getSum.apply(null, values));
//2. ES6 拓展操作符拆分可迭代对象
console.log(getSum(...values));
console.log(getSum(-1, ...values));

function getProduct(a, b, c = 2) {
  return a * b * c;
}
console.log(getProduct(...[1, 2])); 

//收集参数
function getSum(...values) {
  return values.reduce((x, y) => x + y, 0);
}
console.log(getSum(1, 2, 3));*/

//--- 函数声明与函数表达式 ---
//函数声明提升 function declaration hoisting
/* console.log(sum(10, 10));

function sum(num1, num2) {
  return num1 + num2;
}; */

//函数表达式报错
/* console.log(sum(10, 10));

let sum = function(num1, num2) {
  return num1 + num2;
}; */
//Cannot access 'sum' before initialization
//函数定义包含在一个变量初始化语句中，而不是函数声明中

//--- 函数作为值 ---
/* function callSomeFunction(someFunction, someArgument) {
  return someFunction(someArgument);
}

function add10(num) {
  return num + 10;
}

let result1 = callSomeFunction(add10, 10);
console.log(result1);//20

function getGreeting(name) {
  return "Hello, " + name;
}
let result2 = callSomeFunction(getGreeting, "Nicholas");
console.log(result2); */

//从一个函数返回另一个函数
/* function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];

    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

let data = [
  {name: "Zachary", age: 28},
  {name: "Nicholas", age:29}
];

//array.sort(function(x, y){if(x < y){return -1}...});
data.sort(createComparisonFunction("name"));//按 name 排序
console.log(data[0].name);//Nicholas

data.sort(createComparisonFunction("age"));//按 age 排序
console.log(data[0].name);//Zachary
 */

//--- 函数内部 ---
//1. arguments 类数组对象
// 阶乘
/* function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
console.log(factorial(3)); */

//使用 arguments.callee 让函数逻辑与函数名解耦
/* function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
console.log(factorial(3)); 

//摆脱函数名
let trueFactorial = factorial;
factorial = function() {
  return 0;
};
console.log(trueFactorial(5));//不受函数重写的影响
console.log(factorial(5)); */

//2. this 在标准函数和箭头函数中的不同
//标准函数 this 为调用时的上下文
/* global.color = 'red';
let o = {
  color: 'blue'
};

function sayColor() {
  console.log(this.color);
}
sayColor(); //red

o.sayColor = sayColor; //this 指向 o
o.sayColor(); //blue */

//箭头函数的 this 引用定义箭头函数的上下文
/* global.color = 'red';
let o = {
  color:"blue"
};
let sayColor = () => console.log(this.color);

sayColor();
o.sayColor = sayColor;
o.sayColor(); */

//在回调中调用某函数，用箭头函数让 this 指向相应对象
/* function King() {
  this.royaltyName = 'Henry';
  setTimeout(() => console.log(this.royaltyName), 1000);
}
new King();

function Queen() {
  this.royaltyName = 'Elizabeth';
  setTimeout(function () { console.log(this.royaltyName); }, 1000);
}
new Queen();//调用时上下文不存在 royaltyName 所以 undefined */

//函数名只是保存指针的变量，sayColor() 和 o.sayColor() 是同一个函数只是执行上下文不同

//caller 属性引用的是调用当前函数的函数
/* function outer() {
  inner();
}
function inner() {
  console.log(inner.caller);
}
outer(); */

//new.target 正常调用返回 undefined，使用了 new 则引用被调用的构造函数

//--- 函数属性与方法 ---
//每个函数都有 length 和 prototype 属性
//length 为参数的长度
//prototype 保存引用类型所有实例方法

//apply 第一个参数 this 调用函数，第二个参数为 arguments 或 Array
/* function sum(num1, num2) {
  return num1 + num2;
}
function callSum1(num1, num2) {
  return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10));
console.log(callSum2(10, 10)); */

//call 第一个参数 this，其他参数逐个传递
/* function sum(num1, num2) {
  return num1 + num2;
}

function callSum(num1, num2) {
  return sum.call(this, num1, num2);
}

console.log(callSum(10, 10)); */

//控制函数调用上下文即函数体内 this 值的能力
//将任意对象设置为任意函数的作用域
/* global.color = 'red';
let o = {
  color: 'blue'
};
function sayColor() {
  console.log(this.color);
}
sayColor();
sayColor.call(this);
sayColor.call(global);
sayColor.call(o); */

//bind
/* global.color = 'red';
var o = {
  color: 'blue'
};
function sayColor() {
  console.log(this.color);
}
sayColor();
let objectSayColor = sayColor.bind(o);
objectSayColor(); */

//--- 函数表达式 ---
//函数声明提升，先调用后声明
/* sayHi();
function sayHi() {
  console.log("Hi");
} */

//函数表达式：创建一个函数再把它赋给一个变量

//--- 递归 ---
/* function factorial(num) {
  if(num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
} */
//arguments.callee 避免递归中变量名变化的报错
/* function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
} */

//严格模式下使用命名函数表达式
/* const factorial = (function f(num) {
  if(num<=1){
    return 1;
  } else {
    return num * f(num - 1);
  }
});
console.log(factorial(5)); */
//即使把函数赋给另一个变量，表达式 f 也不变


//--- 闭包 ---
//匿名函数不是闭包 closure
//闭包指引用了另一个函数作用域中变量的函数，通常在嵌套函数中实现

//定义私有变量和特权方法，隐藏不能被直接修改的数据
function Person(name) {
  this.getName = () => {
    return name;
  };

  this.setName = (value) => {
    name = value;
  };
}
//定义在构造函数中的特权方法其实是闭包，具有访问所有变量和函数的能力

let person = new Person('Nicholas');
console.log(person);
console.log(person.getName());
person.setName('Aaron');
console.log(person.getName());

