/* //---基本引用类型---
let someday = new Date(Date.UTC(2004, 1, 18)); // 2月18
console.log(someday); 

//RegExp
//匹配字符串中所有 at
let pattern1 = /at/g;

//匹配第一个bat或cat(忽略大小写)
let pattern2 = /[bc]at/i;

//匹配所有 at 结尾的三字符组合(忽略大小写)
let pattern3 = /.at/gi;

//---原始值包装类型---
let s1 = "some text";
let s2 = s1.substring(2);
//等价于
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;

let s1 = "some text";
s1.color = "red";
console.log(s1.color);//undefined

let s2 = {};
s2.color = "red";
console.log(s2.color);//red

let value = "25";
let number = Number(value);
console.log(typeof number); //number

let obj = new Number(value);
console.log(typeof obj); //object

let obj = new Object("some text");
console.log(obj instanceof String);*/

//Boolean
let falseObject = new Boolean(false);
let result = falseObject && true;
console.log(result); //true 尽量不用布尔对象

//Number
//Number.isInteger()方法
console.log(Number.isInteger(1.00)); //true

//String
//valueof(), toLocaleString(), toString() 都返回原始字符串值
let stringObject = new String("hello world");