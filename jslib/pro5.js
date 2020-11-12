/* //---基本引用类型---
let someday = new Date(Date.UTC(2004, 1, 18)); // 2月18
console.log(someday); */

//RegExp
//匹配字符串中所有 at
let pattern1 = /at/g;

//匹配第一个bat或cat(忽略大小写)
let pattern2 = /[bc]at/i;

//匹配所有 at 结尾的三字符组合(忽略大小写)
let pattern3 = /.at/gi;