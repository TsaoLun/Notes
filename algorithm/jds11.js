//----- 二叉堆 -----
//特殊的二叉树，子节点均 大于等于或小于等于父节点
const { BinarySearchTree, defaultCompare, Node } = require('./jds10'); //require 的文件会被执行再导入，并不会在被执行

module.exports = {
    swap
};

const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]];

class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    //对于给定的位置 index 的节点
    //左侧子节点为 2 * index + 1，右侧为 2 * index + 2
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    getRightIndex(index) {
        return 2 * index + 2;
    }
    getParentIndex(index) { //0-1-2
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    //插入值: 先插到堆的底部叶节点，再 siftUp / bubbleUp
    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    //上移操作 siftUp
    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.heap[parent] > this.heap[index]) {
            //父节点大于该值时进行交换，直到父节点小于这个插入的值
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    //移除最值(顶部)
    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        //移除第一个元素后，将最后一个元素移动至根部并执行 siftDown 函数
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (left < size && this.heap[element] > this.heap[left]) {
            element = left;
        }
        if (right < size && this.heap[element] > this.heap[right]) {
            element = right;
        }
        if (index !== element) {
            swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
}

const heap = new MinHeap();
heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);

console.log('Heap size: ', heap.size());
console.log('Heap is empty: ', heap.isEmpty());
console.log('Heap min: ', heap.findMinimum());

/* function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
} */

//堆排序算法