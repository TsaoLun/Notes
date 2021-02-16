/* //--- 迭代器 iteration ---
//for 循环遍历集合
let collection = ['foo', 'bar', 'baz'];
collection.forEach((item) => console.log(item));

//ES6 迭代器模式
//检查迭代器工厂函数
let num = 1;
let obj = {};
console.log(num[Symbol.iterator]);
console.log(obj[Symbol.iterator]);

let str = 'abc';
let arr = ['a', 'b', 'c'];
let map = new Map().set('a', 1).set('b', 2).set('c', 3);
let set = new Set().add('a').add('b').add('c');

console.log(str[Symbol.iterator]);
console.log(arr[Symbol.iterator]);
console.log(map[Symbol.iterator]);
console.log(set[Symbol.iterator]);

console.log(str[Symbol.iterator]());
console.log(arr[Symbol.iterator]());
console.log(map[Symbol.iterator]());
console.log(set[Symbol.iterator]()); */

/* //for of
let arr = ['foo', 'bar', 'baz'];

for (let el of arr) {
    console.log(el);
}

//数组解构
let [a, b, c] = arr;
console.log(a, b, c);

//拓展操作符
let arr2 = [...arr];
console.log(arr2);

//Array.from()
let arr3 = Array.from(arr);
console.log(arr3);

//Set 构造函数
let set = new Set(arr);
console.log(set); //Set(3) { 'foo', 'bar', 'baz' }

//Map 构造函数
let pairs = arr.map((x, i) => [x, i]);
console.log(pairs); //[ [ 'foo', 0 ], [ 'bar', 1 ], [ 'baz', 2 ] ]
let map = new Map(pairs); 
console.log(map);//Map(3) { 'foo' => 0, 'bar' => 1, 'baz' => 2 }

class FooArray extends Array { }
let fooArr = new FooArray('foo', 'bar', 'baz');

for (let el of fooArr) {
    console.log(el);
} 

let arr = ['foo', 'bar'];
console.log(arr[Symbol.iterator]);

let iter = arr[Symbol.iterator]();
console.log(iter);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); //{ value: undefined, done: true }

//迭代期间修改
let arr = ['foo', 'baz'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());

arr.splice(1, 0,'bar');
console.log(arr);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

//比较显式迭代器和原生迭代器
class Foo {
    [Symbol.iterator]() {
        return {
            next() {
                return { done: false, value: 'foo' };
            }
        };
    }
}
let f = new Foo();

console.log(f[Symbol.iterator]()); //{ next: [Function: next] }

let a = new Array();
console.log(a[Symbol.iterator]()); //Object [Array Iterator] {}*/

/* //自定义迭代器(任何实现 Iterator 接口的对象就可以作为迭代器)
class Counter {
    constructor(limit) {
        this.count = 1;
        this.limit = limit;
    }

    next() {
        if (this.count <= this.limit) {
            return { done: false, value: this.count++ };
        } else {
            return { done: true, value: undefined };
        }
    }
    [Symbol.iterator]() {
        return this;
    }
}
let counter = new Counter(3);

for (let i of counter) {
    console.log(i);
}

for (let i of counter) {
    console.log(i);
}//nothing 只能迭代一次 */

/* class Counter {
    constructor(limit) {
        this.limit = limit;
    }

    [Symbol.iterator]() {
        let count = 1,
            limit = this.limit;
        return {
            next() {
                if (count <= limit) {
                    return { done: false, value: count++ };
                } else {
                    return { done: true, value: undefined };
                }
            }
        };
    }
}

let counter = new Counter(3);

for (let i of counter) {
    console.log(i);
}

for (let i of counter) {
    console.log(i);
} 

//提前终止(数组迭代器不能关闭)
let a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();

for (let i of iter) {
    console.log(i);
    if (i > 2) {
        break; 
    }
}
for (let i of iter) {
    console.log(i);
}*/

/* //--- 生成器* 通过 yield 生成自定义?迭代对象 ---
//-可通过 yield 断执行(done:false)-

function* generatorFn() {
    yield;
}

let generatorObject = generatorFn();

console.log(generatorObject.next()); //{ value: undefined, done: false }
console.log(generatorObject.next()); //{ value: undefined, done: true } 

function* generatorFn() {
    yield 'foo';
    yield 'bar';
    return 'baz';
}
let generatorObject = generatorFn();

console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());*/

/* //--生成器对象作为可迭代对象--
function* generatorFn() {
    yield 1;
    yield 2;
    yield 3;
}
for (const x of generatorFn()) {
    console.log(x);
} 

//自定义迭代对象
function* nTimes(n) {
    while (n--) {
        yield;
    }
}
for (let _ of nTimes(3)) {
    console.log('foo');
}

function* generatorFn(initial) {
    console.log(initial);
    console.log(yield);
    console.log(yield);
}
let generatorObject = generatorFn('foo');

generatorObject.next('bar'); //foo
generatorObject.next('bar'); //bar
generatorObject.next('bar'); //bar
generatorObject.next('bar'); //nothing

function* generatorFnB() {
    yield* [1, 2, 3];
}

for (const x of generatorFnB()) {
    console.log(x);
}

//使用 yield* 实现递归
function* nTimes(n) {
    if (n > 0) {
        yield* nTimes(n - 1);
        yield n - 1;
    }
}

for (const x of nTimes(3)) {
    console.log(x);
}*/

class Node {
    constructor(id) {
        this.id = id;
        this.neighbors = new Set();
    }

    connect(node) {
        if (node !== this) {
            this.neighbors.add(node);
            node.neighbors.add(this);
        }
    }
}

class RandomGraph {
    constructor(size) {
        this.nodes = new Set();

        for (let i = 0; i < size; ++i) {
            this.nodes.add(new Node(i));
        }

        const threshold = 1 / size;
        for (const x of this.nodes) {
            for (const y of this.nodes) {
                if (Math.random() < threshold) {
                    x.connect(y);
                }
            }
        }
    }
}