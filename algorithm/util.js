//比较函数
const Compare = {
    biggerThan: (a, b) => {
        return a - b > 0;
    },

    lessThan: (a, b) => {
        return a - b < 0;
    },

    equalTo: (a, b) => {
        return a === b;
    }
};

//操作函数
const Operation = {
    swap: (array, a, b) => [array[a], array[b]] = [array[b], array[a]]
};

module.exports = {
    Compare,
    Operation
};