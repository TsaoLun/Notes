//位运算
/* console.log('5&1:', (5 & 1)); //1: 与 101 & 1 -> 1
console.log('5|1:', (5 | 1)); //5: 或 101 | 1 -> 101
console.log('6|1:', (6 | 1)); //7: 或 110 | 1 -> 111
 */

//const 修改
/* const arr = [1, 3, 4];
arr.push(0);
console.log(arr);

const obj = {};
obj.name = "objName";
console.log(obj); */

//class
/* class Book {
    constructor(title, pages, isbn) {
        this.title = title;
        this.pages = pages;
        this.isbn = isbn;
    }
    printIsbn() {
        console.log(this.isbn);
    }
}
let book = new Book('title', 'pag', 'sibn');
console.log(book.title);
book.title = 'new title';
console.log(book.title);

//类的继承
class ITBook extends Book {
    constructor(title, pages, isbn, technology){
        super(title, pages, isbn);
        this.technology = technology;
    }

    printTechnology(){
        console.log(this.technology);
    }
}

let jsBook = new ITBook('算法','200','1234567890','JavaScript');
console.log(jsBook.title);
console.log(jsBook.printTechnology()); */

//类的属性存取器
class Person {
    constructor (name) {
        this._name = name;
    }
    get getName() {
        return this._name;
    }
    set setName(value) {
        this._name = value;
    }
}

let lotrChar = new Person('Frodo');
console.log(lotrChar.getName);
lotrChar.setName = 'Gandalf';
console.log(lotrChar.getName);
lotrChar._name = 'Sam';
console.log(lotrChar.getName);

