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

/* console.log("---理解原型---");
//构造函数可以是函数表达式或声明
//构造函数与其原型对象相互引用(指向)
//构造函数通过 prototype 属性指向其原型对象，原型对象的 constructor 属性指回构造函数
function Person() { }
console.log(typeof Person.prototype);
console.log(Person.prototype);
console.log(Person.prototype.constructor === Person); //true */

/* //__proto__ 原型链
console.log(Person.prototype); //函数的原型对象 {}
console.log(Person.prototype.__proto__); //构造函数原型对象的原型为 [Object: null prototype] {}
console.log(Object.prototype); //即 Object 的原型对象 [Object: null prototype] {}

console.log(Object.prototype.__proto__ === null); //Object原型的原型为 Null
console.log(Person.prototype.__proto__.__proto__ === null);

//总结之绕晕 😷
//构造函数原型对象的原型即 Object 的原型对象 [Object: null prototype] {}
console.log(Person.prototype.__proto__ === Object.prototype);
//构造函数原型对象的原型的 constructor 属性指向 Object
console.log(Person.prototype.__proto__.constructor === Object);

//prototype 与 __proto__ ，原型对象与原型的区别：构造函数有原型对象，实例没有(只有原型)
console.log(Person.prototype.constructor);//[Function: Person]
console.log(Person.__proto__.constructor);//[Function: Function]

//构造函数、原型对象与实例互不相同
console.log('---实例---');
let person1 = new Person(),
    person2 = new Person();
console.log(person1 !== Person);
console.log(person1 !== Person.prototype);
console.log(Person.prototype !== Person);

//实例通过 __proto__ 链接到原型对象，构造函数通过 prototype 属性链接到原型对象
console.log(person1.__proto__ === Person.prototype);
//实例与构造函数没有直接联系，与原型对象有直接联系
console.log(person1.__proto__.constructor === Person);
//同一个构造函数创建的两个实例共享同一个原型对象
console.log(person1.__proto__ === person2.__proto__);

console.log('---instance of 实例检查 ---');
console.log(person1 instanceof Person);
console.log(person1 instanceof Object);
console.log(Person.prototype instanceof Object);

console.log('---isPrototypeOf 实例原型对象检查：原型对象.isPrototypeOf(实例) ---');
console.log(Person.prototype.isPrototypeOf(person1));

//Object.getPrototypeOf() 获取对象的原型
console.log('---Object.getPrototypeOf() 返回内部特性 [[Prototype]] 的值');
console.log(Object.getPrototypeOf(person1) === Person.prototype);
person1.name = 'lun';
console.log(Object.getPrototypeOf(person1).name);//undefined
Person.prototype.name = 'lun';
console.log(Object.getPrototypeOf(person1).name);//lun 

//Object.setPrototypeOf() 向实例私有特性[[Prototype]]写入值
let biped = {
    numLegs:2
};
let person = {
    name:'Matt'
};
Object.setPrototypeOf(person, biped);
console.log(person.name);
console.log(person.numLegs);
console.log(Object.getPrototypeOf(person)===biped);
//为避免性能问题可使用 Object.create() 创建新对象，同时为其指定原型
let biped2 = {
    numLegs:2
};
let personx = Object.create(biped2);
personx.name = 'Matt';

console.log(personx.name);
console.log(personx.numLegs);
console.log(Object.getPrototypeOf(personx) === biped2);*/

//----- 原型层级 -----
/* console.log('---重写属性---');

function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};

let person1 = new Person();
let person2 = new Person();

person1.name = "Greg";
console.log(person1.name);
console.log(person2.name); */

//---delete 操作---
/* function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};

let person1 = new Person();

person1.name = "Greg";
console.log(person1.name);
delete person1.name;
console.log(person1.name); //Nicholas */

//---hasOwnProperty()---
//确定属性在实例还是原型对象上
/* function Person(){}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();
console.log(person1.hasOwnProperty("name")); //false

person1.name = "Greg";
console.log(person1.name);
console.log(person1.hasOwnProperty("name")); //true
delete person1.name;
console.log(person1.hasOwnProperty("name")); //false

console.log(person2.name);
console.log(person2.hasOwnProperty("name")); //false */

//----- 原型和 in 操作符 -----
/* function Person() {}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
    console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();

console.log(person1.hasOwnProperty("name"));//false
console.log("name" in person1);//true

person1.name = "Greg";
console.log(person1.name);
console.log(person1.hasOwnProperty("name"));//true
console.log("name" in person1);//true */

//---用 hasOwnProperty() 和 in 确定某属性是否在原型上---
//(前 false 后 true)
/* function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}

function Person() { }
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";

Person.prototype.sayName = function(){
    console.log(this.name);
};

let person = new Person();
console.log(hasPrototypeProperty(person, "name"));//true

person.name = "Greg";
console.log(hasPrototypeProperty(person,"name"));//false */

//---Object.keys() 获得对象可枚举实例属性---
function Person() { }
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    console.log(this.name);
};

let keys = Object.keys(Person.prototype);
console.log(keys);
let p1 = new Person();
p1.name = "Rob";
p1.age = 31;
let p1keys = Object.keys(p1);
console.log(p1keys);

//列出所有实例属性(包含不可枚举)
let allkeys = Object.getOwnPropertyNames(Person.prototype);
console.log(allkeys);

//-----对象迭代-----
