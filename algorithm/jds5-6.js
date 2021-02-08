//队列 FIFO，为了高效用对象存储元素
//count 属性控制队列的大小
//lowestCount 追踪第一个元素的变量
class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    //空判断
    // isEmpty() {
    //     return Object.keys(this.items).length === 0;
    // }

    // isEmpty(){
    //     return this.count - this.lowestCount === 0;
    // }
    isEmpty() {
        return this.size() === 0;
    }

    //添加元素到队尾
    enqueue(element) {
        this.items[this.count] = element;
        this.count++;
    }
    //从队首删除元素
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    //查看队首元素
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/*let queue = new Queue();
console.log(queue.isEmpty());
queue.enqueue(3);
queue.enqueue('x');
console.log(queue);
console.log(queue.isEmpty());

console.log(queue.dequeue());
console.log(queue); 

console.log(queue.peek());
console.log(queue.size()); 
console.log(queue.toString()); */

//双端队列
class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
    isEmpty() {
        return this.size() === 0;
    }
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
}

/* const deque = new Deque();
console.log(deque.isEmpty());
deque.addBack('John');
deque.addBack('Jack');
console.log(deque.toString());
console.log(deque.size());
console.log(deque.isEmpty()); */

//--- 击鼓传花 ---
function hotPatoto(elementList, num) {
    const queue = new Queue();
    const eliminatedList = [];

    //载进队列
    for (let i = 0; i < elementList.length; i++) {
        queue.enqueue(elementList[i]);
    }

    //逐个排出
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        eliminatedList.push(queue.dequeue());
    }
    return {
        eliminated: eliminatedList,
        winner: queue.dequeue()
    };
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPatoto(names, 7);
result.eliminated.forEach(name => {
    console.log(`${name}在击鼓传花中被淘汰`);
});
console.log(`胜利者：${result.winner}`);

//--- 回文检查器 ---
