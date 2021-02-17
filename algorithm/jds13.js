//----- 排序和搜索算法 -----
//冒泡排序: 

const { Compare, Operation } = require("./util");

//比较所有相邻的两项，第一个比第二个大则交换，元素项依次向上移至正确的顺序
function bubbleSort(array, compareFn = Compare.biggerThan) {
    const { length } = array;
    for (let i = 0; i < length; i++) { //外循环，进行 array.length 轮冒泡 (与长度一致）
        for (let j = 0; j < length - 1; j++) { //内循环，每轮冒泡都比较所有相邻的数
            if (compareFn(array[j], array[j + 1])) {
                Operation.swap(array, j, j + 1);
                // [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
    return array;
}

//测试冒泡排序
function createNonSortedArray(size) {
    const array = [];
    for (let i = size; i > 0; i--) {
        array.push(i);
    }
    return array;
}


//--- 改进冒泡算法 ---
//每轮外循环都会将最值往最后排
//从内循环中减去外循环中已跑过的轮数，避免不必要的比较
function modifiedBubbleSort(array, compareFn = Compare.biggerThan) {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1])) {
                Operation.swap(array, j, j + 1);
            }
        }
    }
    return array;
}
//但复杂度依然为 O(n^2)

//----- 选择排序 -----
//找到最小值放在第一位并以此类推
function selectionSort(array, compareFn = Compare.biggerThan) {
    const { length } = array;
    let indexMin;
    for (let i = 0; i < length - 1; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (compareFn(array[indexMin], array[j])) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            Operation.swap(array, i, indexMin);
        }
    }
    return array;
}
//复杂度同样为 O(n^2)


//----- 插入排序 -----
//假定第一项已排序，确定位置并插入第二项，以此类推
function insertionSort(array, compareFn = Compare.biggerThan) {
    const { length } = array;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], temp)) {
            //从队首子数组的尾部开始对比，插入项小则将被对比项后移，再去对比之前的一项，插入项大于等于对比项时停止
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp; //插入项大于等于对比项，则确定了插入项的位置
    }
    return array;
}
//排序小型数组时，性能比选择排序与冒泡排序好

//----- 归并排序 -----
//复杂度 O(nlog(n))，可在实际中使用
//将原始数组切分为小数组，直到每个小数组只有一个位置，再将小数组归并为较大的数组

function mergeSort(array, compareFn = Compare.lessThan) {
    if (array.length > 1) { //停止条件
        const { length } = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, right, compareFn);
    }
    return array;
}

function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        result.push(
            compareFn(left[i], right[j]) ? left[i++] : right[j++]
        );
    //比较left数组项对应项是否更小，是则将该项从left数组添至归并结果再递增迭代变量，否则从right数组添加并递增
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}//一组结束后，将left数组或right数组的剩余项添加到归并数组中，并作为结果返回


//----- 快速排序 -----
//同样分而治之，性能还略好



let array = createNonSortedArray(5);
console.log(array.join()); //5,4,3,2,1
array = mergeSort(array);
console.log(array.join()); //1,2,3,4,5





