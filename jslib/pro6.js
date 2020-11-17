/* //---集合引用类型---
//构造函数 new, Object
let person = new Object();
person.name = "Nicholas";
person.age = 29;
console.log(person); 

//对象字面量表示法 object literal
let person = {
    name: "Nicholas",
    age: 29,
};
console.log(person);

//对象字面量表示法 大括号
let person = {};
person.name = "Nicholas";
person.age = 29;
console.log(person);

function displayInfo(args) {
    let output = "";

    if (typeof args.name == "string") {
        output += "Name: " + args.name + "\n";
    }

    if (typeof args.age == "number") {
        output += "Age: " + args.age + "\n";
    }
    console.log(output);
}

displayInfo({
    name: "Nicholas",
    age: 29,
});

displayInfo({
    name: "Greg"
});

//中括号定义属性(强大)
let person = {};
person["name.first"] = 'Aaron';
person["last name"] = 'Yuan';
person.age = 26;
console.log(person["name.first"]);
console.log(person.age);*/

/* //---Array---
let colors = new Array(); //Array 构造函数
let colors20 = new Array(20); //设置 length 为 20 [ <20 empty items> ]
let colorsrbg = new Array("red", "blue", "green");
console.log({ colors, colors20, colorsrbg }); 

//from() 对可迭代结构转换
const m = new Map().set(1, 2)
    .set(3, 4);
const s = new Set().add(1)
    .add(2)
    .add(3)
    .add(4);
console.log(m);
console.log(Array.from(m));
console.log(s);
console.log(Array.from(s));

//浅复制
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);
const a3 = a1;

console.log(a1 === a2); //false
console.log(a3 === a1); //true

//其他可迭代对象
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
};
console.log(Array.from(iter));

// arguments 对象转换
function getArgsArray() {
    return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4));

//转换必要属性
const arrayLikeObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    length: 4,
    ops: null,
};
console.log(Array.from(arrayLikeObject));

//Array.from() 第二个参数操作数组(强)，第三个参数指定映射函数 this 值(此时不能用箭头)
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x ** 2);
const a3 = Array.from(a1, function (x) { return x ** this.exponent; }, { exponent: 2 });
console.log(a2);
console.log(a3);

//Array.of() 将参数转换为数组
console.log(Array.of(1, 2, 3, 4));

//数组空位(因为不一致性，实践中避免使用)
const options = [, , , , ,];//5个逗号的5元素空位(undefined) ESLint 不允许
const option2 = Array(5);
console.log(options.length);
console.log(options); 
console.log(option2);
console.log(options == option2); //都是 [<5 empty items>] 但是 false
console.log(typeof options);
console.log(typeof option2);//都是 object
console.log(options instanceof Array);
console.log(option2 instanceof Array); //都是 Array

const options = [1, , , , 5]; //三个空位
console.log(options.map(() => 6)); //map()跳过空位
console.log(options.join('-')); //join()视为空字符串

let colors = ["red", "blue", "green"];
colors[0] = "black";
console.log(colors[0]);
console.log(Array.isArray(colors));*/

/* //迭代器方法
const a = ["foo", "bar", "baz", "qux"];
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());

console.log(aKeys);
console.log(aValues);
console.log(aEntries); 

//ES6 解构在循环中拆分键值对
const a = ["foo", "bar", "baz", "qux"];
for (const [idx, element] of a.entries()) {
    console.log(idx);
    console.log(element);
}*/

/* //复制和填充方法
const zeroes = [0, 0, 0, 0, 0];
zeroes.fill(4, 3, 10);
console.log(zeroes); 

//copyWithin 浅复制
let ints,
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

ints.copyWithin(5);//位置 5 处从前往后复制
console.log(ints);
reset();

ints.copyWithin(0, 5);//将索引 5 开始的内容插入 0 开始的位置
console.log(ints);
reset();

ints.copyWithin(4, 0, 3);//将索引 0 到 3 插入到索引 4 的位置
console.log(ints);
reset();

//转换方法
let colors = ["red", "blue", "green"];
console.log(colors.toString()); //逗号分割
console.log(colors.valueOf());
console.log(colors);*/

/* //栈方法
let colors = new Array();
let count = colors.push("black", "green");
console.log(count);

count = colors.push("black");
console.log(count);

let item = colors.pop();
console.log(item);
console.log(colors.length); 

//队列方法 shift unshift
let colors = new Array();
let count = colors.push("red", "green");
console.log(count);

let item = colors.shift();
console.log(item);
console.log(colors.length);

count = colors.unshift("black");
console.log(count);
console.log(colors);*/

/*//排序方法
let values = [1, 3, 2, 40, 5]; //首字符
values.sort();
console.log(values);

//加入比较函数
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}

let values = [0, 1, 5, 10, 15];
values.sort(compare);
console.log(values);

//简写
let value = [0, 1, 5, 10, 15];
value.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
console.log(value);

//操作方法
let colors = ["red", "green", "blue"];
let colors2 = colors.concat("yellow", ["black", "brown"]);
console.log(colors);
console.log(colors2);

//归并方法 reduce()
let values = [1, 2, 3, 4, 5];
let sum = values.reduce((prev, cur)=>{
    return prev + cur;
});
console.log(sum);*/

//Map

