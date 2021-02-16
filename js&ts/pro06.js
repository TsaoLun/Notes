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

/* //Map
const m1 = new Map([
    ["key1", "val1"],
    ["key2", "val2"],
    ["key3", "val3"],
]);
console.log(m1.size);

const m2 = new Map({
    [Symbol.iterator]: function* () {
        yield ["key1", "val1"];
        yield ["key2", "val2"];
        yield ["key3", "val3"];
    }
});
console.log(m2.size);

const m3 = new Map([[]]);
console.log(m3.has(undefined));
console.log(m3.get(undefined)); 

const m = new Map();

console.log(m.has("firstName"));
console.log(m.get("firstName"));
console.log(m.size);

m.set("firstName", "Matt")
    .set("lastName", "Firsbie");

console.log(m.has("firstName"));
console.log(m.get("firstName"));
console.log(m.size);

m.delete("firstName");

console.log(m.has("firstName"));
console.log(m.size);

m.clear();

console.log(m.has("lastName"));
console.log(m.size);

//set() 返回映射实例，将多个操作连缀
const m = new Map().set("key1", "val1");

m.set("key2", "val2")
    .set("key3", "val3");

console.log(m.size);
const functionKey = function () { };
const symbolKey = Symbol();
const objectKey = new Object();

m.set(functionKey, "functionValue");
m.set(symbolKey, "symbolValue");
m.set(objectKey, "objectValue");

console.log(m.get(functionKey));
console.log(m.get(symbolKey));
console.log(m.get(objectKey));

console.log(m.get(function () { }));

const m = new Map();
const objKey = {},
    objVal = {},
    arrKey = [],
    arrVal = [];
m.set(objKey, objVal);
m.set(arrKey, arrVal);

//WeakMap 键为 Object
const key1 = { id: 1 },
      key2 = { id: 2 },
      key3 = { id: 3 };
const wm = new WeakMap([
    [key1, "val1"],
    [key2, "val2"],
    [key3, "val3"],
]);
console.log(wm.get(key1));
console.log(wm.get(key2));
console.log(wm.get(key3));*/

/* //原始值可以先包装成对象
const stringKey = new String("key");
const wm2 = new WeakMap([
    [stringKey, "val1"]
]);
console.log(wm2.get(stringKey));

const key1 = { id: 1 },
    key2 = { id: 2 },
    key3 = { id: 3 };

const wm = new WeakMap().set(key1, "val1");

wm.set(key2, "val2")
    .set(key3, "val3");

console.log(wm.get(key1));
console.log(wm.get(key2));
console.log(wm.get(key3)); 

//使用弱映射，私有变量
const wm = new WeakMap();

class User {
    constructor(id) {
        this.idProperty = Symbol('id');
        this.setId(id);
    }

    setPrivate(property, value) {
        const privateMembers = wm.get(this) || {};
        privateMembers[property] = value;
        wm.set(this, privateMembers);
    }

    getPrivate(property) {
        return wm.get(this)[property];
    }

    setId(id) {
        this.setPrivate(this.idProperty, id);
    }

    getId() {
        return this.getPrivate(this.idProperty);
    }
}

const user = new User(123);
console.log(user.getId());
user.setId(456);
console.log(user.getId());
console.log(wm.get(user)[user.idProperty]);*/


//--- Set ---
const s1 = new Set(["val1", "val2", "val3"]);
s1.add("Matt");
console.log(s1.size);
console.log(s1.has("val2"));
console.log(typeof s1);
console.log(s1 instanceof Set);