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
/* function Person() { }
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
 */

//-----对象迭代-----
/* const o = {
    foo: 'bar',
    baz: 1,
    qux: {}
};

//Object.values() 返回对象值的数组
console.log(Object.values(o));//[ 'bar', 1, {} ]
//Object.entries() 返回键值对数组
console.log(Object.entries((o)));//[ [ 'foo', 'bar' ], [ 'baz', 1 ], [ 'qux', {} ] ]

console.log('---其他原型语法---');
//包含所有属性和方法对对象字面量
function Person() { }
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
//以上方法重写了 prototype 对象，constructor 属性也指向了新对象
//(Object 构造函数，不是原构造函数)
let friend = new Person();
console.log(friend instanceof Object);
console.log(friend instanceof Person);
console.log(friend.constructor == Person);//false
console.log(friend.constructor == Object);//true
 */

//---为保留 constructor 在重写时专门设置---
//Object.defineProperty()
/* function Person() { }
Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
//恢复 constructor 属性
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
}); 

console.log('---原型动态性---');
//对原型对修改会在已存在对实例中反映
let friend = new Person();
Person.prototype.sayHi = function() {
    console.log("hi");
};
friend.sayHi(); */
//实例与原型之间对链接是指针而不保存副本

//---实例只有指向原型的指针，没有指向构造函数对指针---
/* function Person() { }
let friend = new Person();
Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
        console.log(this.name);
    }
};
// friend.sayName(); //调用重写原型之后的属性报错
let friend2 = new Person();
friend2.sayName(); //Nicholas */
//新实例在重写原型之前创建，最初的原型没有 sayName 属性
//此处注意**修改原型与重写原型**，给实例造成的影响

//---原型模式是实现所有原生引用类型的模式---
//如 sort() 方法在 Array.prototype 上定义
/* console.log(typeof Array.prototype.sort); //function
//如 substring() 方法在 String.prototype 上定义
console.log(typeof String.prototype.substring); //function

//通过原生对象原型添加方法
String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};
let msg = "Hello World!";
console.log(msg.startsWith("Hello"));

//---原型的问题---
//1. 弱化构造函数初始化参数能力，所有实例默认相同属性值
//2. 共享特性

function Person() { }
Person.prototype = {
    constructor:Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends:["Shelby", "Court"],
    sayName() {
        console.log(this.name);
    }
};

let person1 = new Person();
let person2 = new Person();

person1.friends.push("Van");
console.log(person2.friends); */
//如果某属性在 Person.prototype 上而非实例上，通过 push 方法修改该属性会更改全部实例

//----- 继承 -----
//---原型链---
/* function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
//继承 SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

let instance = new SubType();
console.log(instance.getSubValue());
console.log(instance.getSuperValue()); */
//SuperType 实例所有属性和方法也会存在于 SubType

//---覆盖&增加父类的方法---
/* function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}
//继承 SuperType
SubType.prototype = new SuperType();

//新方法
SubType.prototype.getSuperValue = function() {
    return this.subproperty;
};

//覆盖已有的方法
SubType.prototype.getSuperValue = function(){
    return false;
};
*/
//---以字面量方式创建的原型方法相当于重写了原型链---
/* function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype = {
    getSubValue(){
        return this.subproperty;
    }
};
let instance = new SubType();
console.log(instance.getSuperValue());//报错 */

//1. 原型链的引用值共享问题
//2. 无法在不影响所有对象实例的情况下把参数传进父类构造函数

//-----盗用构造函数-----
//在子类构造函数中调用父类构造函数
//使用 apply() 和 call() 方法以新创建的对象为上下文执行构造函数
/* function SuperType() {
    this.colors = ["red", "blue", "green"];
}
function SubType() {
    SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors);

let instance2 = new SubType();
console.log(instance2.colors); */

//---传递参数---
/* function SuperType(name) {
    this.name = name;
}

function SubType() {
    SuperType.call(this, "Nicholas");//参数 name
    this.age = 29;
}
let instance = new SubType();
console.log(instance.name);
console.log(instance.age); */
//问题：必须在构造函数中调用方法因此函数不能重用，子类不能访问父类原型方法

//---组合继承---
//使用原型链继承原型上的属性和方法，通过盗用构造函数继承实例属性
/* function SuperType(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}

//继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
    console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge(); */

//原型式继承
/* function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

let person = {
    name: "Nicholas",
    friends:["Shelby","Court","Van"]
};

let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends); */

//----- 类 -----
//类声明
// class Person {}
//类表达式
/* // const Animal = class {};

let Person = class PersonName {
    identify() {
        console.log(Person.name, PersonName.name);
    }
};

let p = new Person();
p.identify();
console.log(Person.name); */

//---类构造函数---
//new 实例化操作等同调用其构造函数

/* class Animal {}
class Person {
    constructor(){
        console.log('person ctor');
    }
}

class Vegetable {
    constructor() {
        this.color = 'orange';
    }
}

let a = new Animal();
let p = new Person();
let v = new Vegetable();
console.log(v.color); */

//实例化时传入的参数作为构造函数的参数
/* class Person {
    constructor(name) {
        console.log(arguments.length);
        this.name = name || null;
    }
}
let p1 = new Person;
console.log(p1.name);

let p2 = new Person();
console.log(p2.name);

let p3 = new Person('Jake');
console.log(p3.name); */

//instanceof 检测
/* class Person {
    constructor(override) {
        this.foo = 'foo';
        if (override) {
            return {
                bar: 'bar'
            };
        }
    }
}
let p1 = new Person(),
    p2 = new Person(true);
console.log(p1);
console.log(p1 instanceof Person);

console.log(p2);
console.log(p2 instanceof Person);
//false, 返回的不是 this 对象 */

//类构造函数与普通构造函数
/* function Person() {}
class Animal {}

let p = Person(); */
//不加 new 会把 window/global 作为 this 来构建实例
//let a = Animal();//报错，需 new

//类构造函数仍要使用 new 调用
/* class Person {}

let p1 = new Person();

//p1.constructor();
//Class constructor Person cannot be invoked without 'new'

let p2 = new p1.constructor(); */

//---把类当作特殊函数---
/* class Person {}
console.log(Person);
console.log(typeof Person);

console.log(Person.prototype);
console.log(Person === Person.prototype.constructor);//原型的 constructor 属性指向自身

let p = new Person();
console.log(p instanceof Person); */

//将类构造函数当成普通构造函数来使用，instanceof 结果相反
/*class Person {}
let p1 = new Person();

console.log(p1.constructor === Person);//true
console.log(p1 instanceof Person);//true
console.log(p1 instanceof Person.constructor);//false

let p2 = new Person.constructor();

console.log(p2.constructor === Person);
console.log(p2 instanceof Person);
console.log(p2 instanceof Person.constructor);

//把类作为参数传递
let classList = [
    class {
        constructor(id) {
            this.id_=id;
            console.log('instance ${this.id_}');
        }
    }
];

function createInstance(classDefinition, id) {
    return new classDefinition(id);
}
let foo = createInstance(classList[0], 3141);

//立即实例化
let p = new class Foo {
    constructor(x) {
        console.log(x);
    }
}('bar');
console.log(p); */

//-----实例，原型和类成员-----
/* class Person {
    constructor() {
    //先使用对象包装类型定义一个字符串再测试相等
        this.name = new String('Jack');
        this.sayName = () => console.log(this.name);
        this.nicknames = ['Jake', 'J-Dog'];
    }
}
let p1 = new Person(),
    p2 = new Person();

p1.sayName();
p2.sayName();

console.log(p1.name === p2.name);
console.log(p1.sayName === p2.sayName);
console.log(p1.nicknames === p2.nicknames); */

//---原型方法与访问器---
/* class Person {
    constructor(){
        //添加到 this 的所有内容都会存在于不同的实例上
        this.locate = () => console.log('instance');
    }
    //在类块中定义的所有内容都会定义在类的原型上
    locate() {
        console.log('prototype');
    }
}
let p = new Person();
p.locate();//instance
Person.prototype.locate();//prototype */

//不能在类块中给原型添加原始值或对象作为成员数据
// class Person {
//     name: 'Jake'
// }

//类方法等同于对象属性，可以使用字符串、符号或计算的值作为键
/* const symbolKey = Symbol('symbolKey');
class Person {
    stringKey() {
        console.log('invoked stringKey');
    }
    [symbolKey]() {
        console.log('invoked symbolKey');
    }
    ['computed'+'Key']() {
        console.log('invoked computedKey');
    }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name); */
//类定义支持获取和设置访问器
/* class Person {
    set name(newName) {
        this.name_=newName;
    }
    get name() {
        return this.name_;
    }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name); */

//静态类方法：执行不特定于实例的操作
/* class Person {
    constructor() {
        //添加到 this 的所有内容都会存在于不同的实例上
        this.locate = () => console.log('instance', this);
    }
    
    //定义在类的原型对象上
    locate() {
        console.log('prototype', this);
    }
    
    //定义在类本身上
    static locate() {
        console.log('class', this);
    }
}
let p = new Person();
p.locate();
Person.prototype.locate();
Person.locate(); */

//静态类方法作为实例工厂
/* class Person {
    constructor(age) {
        this.age_ = age;
    }

    sayAge() {
        console.log(this.age_);
    }

    static create() {
        //使用随机年龄创建并返回一个 Person 实例
        return new Person(Math.floor(Math.random()*100));
    }
}

console.log(Person.create()); */

//---非函数原型和类成员---
/* class Person {
    sayName() {
        console.log(`${Person.greeting} ${this.name}`);
    }
}
Person.greeting = 'My name is';

Person.prototype.name = 'Jake';

let p = new Person();
p.sayName(); */

//迭代器和生成器方法
//类定义语法支持在原型和类本身上定义生成器方法
/* 
class Person {
    //在原型上定义生成器方法
    *createNicknameIterator() {
        yield 'Jack';
        yield 'Jake';
        yield 'J-Dog';
    }
    
    //在类上定义生成器方法
    static *createJobIterator() {
        yield 'Butcher';
        yield 'Baker';
        yield 'Candlestick maker';
    }
}

let jobIter = Person.createJobIterator();
console.log(jobIter.next().value);
console.log(jobIter.next().value);
console.log(jobIter.next().value);

let p = new Person();
let nicknameIter = p.createNicknameIterator();
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value); */

//因为支持生成器方法，可以通过添加默认迭代器把类实例变成可迭代对象
/* class Person {
    constructor(){
        this.nicknames = ['Jack', 'Jake', 'J-Dog'];
    }
    *[Symbol.iterator]() {
        yield *this.nicknames.entries();
    }
}
let p = new Person();
for (let [i, nickname] of p) {
    console.log(nickname);
} */

//只返回迭代器实例
/* class Person {
    constructor(){
        this.nicknames = ['Jack', 'Jake', 'J-Dog'];
    }
    [Symbol.iterator]() {
        return this.nicknames.entries();
    }
}
let p = new Person();
for (let [i, nickname] of p) {
    console.log(nickname);
} */

//--- 继承 ---
//ES6 原生支持类继承 extends
/* class Vehicle {}
class Bus extends Vehicle {}

let b = new Bus();
console.log(b instanceof Bus);
console.log(b instanceof Vehicle);

function Person() {}
//继承普通构造函数
class Engineer extends Person {}

let e = new Engineer();
console.log(e instanceof Engineer);
console.log(e instanceof Person); */

//类和原型上定义的方法都会带到派生类
//this 的值会反映调用相应方法的实例或类
/* class Vehicle {
    identifyPrototype(id) {
        console.log(id, this);
    }
    static identifyClass(id) {
        console.log(id, this);
    }
}
class Bus extends Vehicle {}

let v = new Vehicle();
let b = new Bus(); */

//派生类方法通过 super 关键字引用原型
/* class Vehicle {
    constructor() {
        this.hasEngine = true;
    }
}
class Bus extends Vehicle {
    constructor() {
        super();
        console.log(this instanceof Vehicle);
        console.log(this);
    }
}
new Bus(); */

//在静态方法中通过 super 调用继承的类上的静态方法
//派生类的构造函数和静态方法
/* class Vehicle {
    static identify() {
        console.log('vehicle');
    }
}
class Bus extends Vehicle {
    static identify() {
        super.identify();
    }
}
Bus.identify(); */

//如果在派生类中显式定义类构造函数，要么调用 super 要么返回对象
/* class Vehicle {}
class Car extends Vehicle {}

class Bus extends Vehicle {
    constructor() {
        super();
    }
}

class Van extends Vehicle {
    constructor() {
        return {};
    }
}
console.log(new Car());
console.log(new Bus());
console.log(new Van()); */

//---抽象基类---
//供其他类继承但本身不会实例化
class Vehicle {
    constructor() {
        console.log(new.target);
        if (new.target === Vehicle) {
            throw new Error();
        }
    }
}