//--- 对象，类与面向对象 ---
//对象
/* let person = new Object();
person.name = "Nicholas";
person.sayName = function () {
    console.log(this.name);
}; 

let person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};

person.sayName();

//不可修改属性
let person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
console.log(person.name);
person.name = "Greg";
console.log(person.name);

//不可配置属性
let person = {};
Object.defineProperty(
    person, "name", {
    configurable: false,
    value: "Nicholas"
});
console.log(person.name);
delete person.name;
console.log(person.name);

//Object.defineProperty()
//configurable, enumerable, writable 默认 false

let person = {};
Object.defineProperty(
    person, "name", {
    value: "Nicholas"
});
person.name = "Greg";
console.log(person.name);
delete person.name;
console.log(person.name);

//访问器 Getter, Setter 函数
let book = {
    year_: 2017,
    edition: 1
};

Object.defineProperty(book, "year", {
    get() {
        return this.year_;
    },
    set(newValue) {
        if (newValue > 2017) {
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});
book.year = 2018;
console.log(book.edition);

//定义多个属性
let book = {};
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    },

    year: {
        get() {
            return this.year_;
        },
        set(newValue) {
            if (newValue > 2017) {
                this.year_ = newValue;
                this.edition += newValue - 2017;
            }
        }
    }
});
console.log(book.year);
book.year = 2019;
console.log(book.edition);

//---合并对象 Object.assign()---
let dest, src, result;

dest = {};
src = { id: 'src' };

result = Object.assign(dest, src);

console.log(dest === result);
console.log(dest !== src);
console.log(result);
console.log(dest);*/

/* //工厂模式创建对象
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
// let person1 = createPerson("Nicholas", 29, "Software Engineer");
// let person2 = createPerson("Greg", 27, "Doctor");

//构造函数模式(能创建对象的函数)
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor");

person1.sayName();
person2.sayName();

console.log(person1.constructor === Person); //true
console.log(Person instanceof Function); //true
console.log(person1 instanceof Function); //false
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true 

//不需要传参可省略括号
function Person() {
    this.name = "Jake";
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person();
let person2 = new Person;

person1.sayName();
person2.sayName();

let n = 1;
function sayName() {
    n++;
    console.log('yes');
}
sayName;
sayName();
console.log(n);

//不使用 new 则添加至 window/global
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
Person("Greg", 27, "Doctor");
console.log(name);
console.log(global.name);
global.sayName();

//构造函数的 Function 重复创建
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor");
console.log(person1.sayName == person2.sayName);
//问题：函数体每次会 new 一个新的 Function
//解决方法：将函数定义转移到构造函数外部
function PersonV2(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName(x) {
    console.log(`${x}! `+this.name);
}
let personV1 = new PersonV2("Nicholas", 29, "Software Engineer"); 
let personV2 = new PersonV2("Greg", 27, "Doctor");
personV1.sayName(); //undefined! Nicholas
personV1.sayName; // nothing
console.log(personV1.sayName == personV2.sayName);*/

/* //原型模式
function Person() { }

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};

let person1 = new Person();
person1.sayName();

let person2 = new Person();
person2.sayName();

console.log(person1.sayName == person2.sayName); //true
console.log(person1.sayName() == person2.sayName()); //Nicholas, Nicholas, true 

//使用函数表达式
let Person = function () { };
Person.prototype.name = "Nicholas";
Person.prototype.sayName = function () {
    console.log(this.name);
};

let person1 = new Person();
person1.sayName();

let person2 = new Person();
person2.sayName();

console.log(person1.sayName == person2.sayName);*/

//理解原型

