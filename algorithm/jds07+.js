//原生 Set
const set = new Set();
set.add(1);
console.log(set.values());
console.log(set.has(1));
set.delete(1);
console.log(set.size);

//拓展运算符
const setA = new Set();
const setB = new Set([2, 3]);
setA.add(1);
setA.add(2);
//并集
console.log(new Set([...setA, ...setB]));//将集合展开为数组
//交集
console.log(new Set([...setA].filter(x => setB.has(x))));
//差集
console.log(new Set([...setA].filter(x => !setB.has(x))));