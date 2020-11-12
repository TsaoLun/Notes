
/* //---引用值 reference value---
//引用值可以添加属性
let person = new Object();
person.name = "Aaron";
console.log(person.name);

//---原始值 primitive value---
//引用值无法添加属性
let name = "Aaron";
name.age = 27;
console.log(name.age);

//new关键字创建object实例
let name2 = new String("Matt");
name2.age = 27;
console.log(name2.age);
console.log(typeof name2);

//复制引用值实际为复制指针
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "Nicholas";
console.log(obj2.name); 

//函数的参数按值传递
function addTen(num) {
    num += 10;
    return num;
}

let count = 20;
let result = addTen(count);
console.log(count);
console.log(result);
//传递对象
function setName(obj) {
    obj.name = "Nicholas";
}
let person = new Object();
setName(person);
console.log(person.name);*/


/*//---执行上下文与作用域---
var color = "blue";
function changeColor() {
    if (color === "blue") {
        color = "red";
    } else {
        color = "blue"
    }
}
changeColor();
console.log(color);

var color = "blue";

function changeColor() {
    let anotherColor = "red";

    function swapColors() {
        let tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    swapColors();
}
changeColor();

//直接初始化的为全局上下文
function add(num1, num2) {
    sum = num1 + num2;
    return sum;
}
let result = add(10, 20);
console.log(sum);*/

//标识符查找
var color = 'blue';
function getColor() {
    let color = 'red';
    return color;
}

console.log(getColor());