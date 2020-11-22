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
console.log(book.edition);*/

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
