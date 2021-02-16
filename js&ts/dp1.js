//多态
/* const makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
};

const Duck = function () { };
const Chicken = function () { };

makeSound(new Duck());
makeSound(new Chicken()); 
 */

//改进：把不变多部分隔离出来，把可变多部分封装起来，以拓展程序
//隔离不变多部分
/* const makeSound = function (animal) {
    animal.sound();
};
//封装可变部分
const Duck = function () { };

Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
};

const Chicken = function () { };

Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};

makeSound(new Duck());
makeSound(new Chicken());

const Dog = function () { };

Dog.prototype.sound = function () {
    console.log('汪汪汪');
};

makeSound(new Dog()); */
//静态语言有时必须借助超类才能实现多态
//JS 的多态性是与生俱来的，一个对象可以是多种类型

//地图 API 示例
/* const googleMap = {
    show: function(){
        console.log('开始渲染谷歌地图...');
    }
};

const renderMap = function(){
    googleMap.show();
};

renderMap(); */
//更换地图
/* const googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};

const baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};

// const renderMap = function(type) {
//     if(type === 'google'){
//         googleMap.show();
//     } else if (type==='baidu'){
//         baiduMap.show();
//     }
// };

//避免堆砌条件语句
const renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

renderMap(googleMap);
renderMap(baiduMap);

const sosoMap = {
    show: function () {
        console.log('开始渲染搜搜地图');
    }
};

renderMap(sosoMap); */

//--- 封装 ---
//通过函数创建作用域
/* var myObject = (function () {
    var __name = 'seven';//私有变量
    return {
        getName: function () {
            return __name;//公开方法
        }
    };
})();

console.log(myObject.getName());
console.log(myObject.__name); */

//ES6 可以通过 Symbol 创建私有属性

//原型模式：Object.create 用来克隆对象
/* const Plane = function(){
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};

let plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

let clonePlane = Object.create(plane);
console.log(clonePlane.blood);
console.log(clonePlane.attackLevel);
console.log(clonePlane.defenseLevel);

//在不支持 Object.create 的浏览器中添加
Object.createClone = function(obj){
    let F = function(){};
    F.prototype = obj;

    return new F();
};

let oldClonePlane = Object.createClone(plane);
console.log(oldClonePlane.blood);
console.log(oldClonePlane.attackLevel);
console.log(oldClonePlane.defenseLevel); */

//JS 中的根对象为 Object.prototype
/* const obj1 = new Object();
const obj2 = {};

console.log(Object.getPrototypeOf(obj1)===Object.prototype);
console.log(Object.getPrototypeOf(obj2)===Object.prototype); */

//new 运算符
/* function Person(name){
    this.name = name;
}

Person.prototype.getName = function(){
    return this.name;
};

const a = new Person('sven');

console.log( a.name );
console.log( a.getName() );
console.log( Object.getPrototypeOf(a) === Person.prototype );
 */

//理解 new 运算过程
/* function Person(name) {
    this.name = name;
}

Person.prototype.getName =19

const objectFactory = function () {
    const obj = new Object(),//克隆空对象
        Constructor = [].shift.call(arguments);//取得外部传入的构造器

    obj.__proto__ = Constructor.prototype;//指向正确的原型
    const ret = Constructor.apply(obj, arguments);//借助传入的构造器给 obj 设置属性

    return typeof ret === 'object' ? ret : obj;
};

var a = objectFactory(Person, 'sven');

console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);
 */

//__proto__指向构造器的原型对象 {Constructor}.prototype
/*  const a1 = new Object();
 console.log(a1.__proto__ === Object.prototype);

 //对象的继承
 const obj = { name: 'sven' };

 const A = function(){};
 A.prototype = obj;

 const a = new A();
 console.log(a.name); */

//类的继承(链)
/* const A = function () { };
A.prototype = { name: 'sven' };

const B = function () { };
B.prototype = new A();

const b = new B();
console.log(b.name); */

//Class 背后的原型机制
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak(){
        return "woof";
    }
}

const dog = new Dog("Scamp");
console.log(dog.getName() + ' says ' + dog.speak());