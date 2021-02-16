//--- 链表 ---
//1. 在内存中非连续(不同于数组)
//2. 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(指针或链接)组成。
class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

function defaultEquals(a, b) {
    return a === b;
}

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            //循环访问列表，直到最后一项
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    //从特定位置移除元素
    removeAt(index) {
        //检查越界值，初始化 current 
        if (index >= 0 && index < this.count) {
            let current = this.head;

            //移除第一项，从第二项 current.next 开始
            if (index === 0) {
                this.head = current.next;
            } else {
                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;//不是有效位置时返回
    }

    //迭代列表到目标位置并返回
    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {//为什么需要 node != null ?
                node = node.next; //迭代到链表最后一项，node.next 为 null
            }
            return node;
        }
        return undefined;
    }
    //重构 remove 方法
    //替换移除的部分
    // if (index === 0){
    //     this.head = current.next;
    // } else {
    //     const previous =  this.getElementAt(index - 1);
    //     current = previous.next;
    //     previous.next = current.next;
    // }
    // this.count--;

    //在任意位置插入元素
    //把 node.next 的值指向 current，再把 previous.next 的值设为 node
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                //拿到前一个节点 previous
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                //把 node.next 的值指向 current (即 previous.next)
                previous.next = node;//将 node 赋给前一个节点的引用
            }
            this.count++;
            return true;
        }
        return false;
    }

    //返回一个元素的位置
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            let current = this.head;
            for (let i = 0; i < this.count && current != null; i++) {
                if (this.equalsFn(element, current.element)) {
                    return i;
                }
                current = current.next;
            }
            return -1;
        }
    }

    //从链表中移除元素
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    size() {
        return this.count;
    }
    isEmpty() {
        return this.size() === 0;
    }
    getHead() {
        return this.head;
    }

    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
        }
        return objString;
    }
}

//--- 双向链表 ---
class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev;
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                //如果只有一项，更新 tail
                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            } else {
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}


class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }

    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                    current.next = node;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                if (this.size() === 1) {
                    this.head = undefined;
                } else {
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }

    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }

    getIndexNextSortedElement(element) {
        let current = this.head;
        let i = 0;
        for (let i = 0; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
}

class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1);
    }
}