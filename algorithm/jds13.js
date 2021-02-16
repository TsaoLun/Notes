//----- 排序和搜索算法 -----
//冒泡排序: 

const { defaultCompare } = require("./jds10");
const { swap } = require("./jds11");

//比较所有相邻的两项，第一个比第二个大则交换，元素项依次向上移至正确的顺序
function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array;
    for (let i = 0; i < length; i++) { //外循环，进行 array.length 轮冒泡 (与长度一致）
        for (let j = 0; j < length - 1; j++) { //内循环，每轮冒泡都比较所有相邻的数
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
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

let array = createNonSortedArray