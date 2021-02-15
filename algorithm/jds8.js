function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString();
}
//若 Object 没有实现 toString 方法会导致 [object Object]
class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }

    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    // get(key) {
    //     if (this.hasKey(key)){
    //         return this.table[this.toStrFn(key)];
    //     }
    //     return undefined;
    // }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    // keyValues(){
    //     const valuePairs = [];
    //     for (const k in this.table) {
    //         if (this.hasKey(k)) {
    //             valuePairs.push(this.table[k]);
    //         }
    //     }
    //     return valuePairs;
    // }
    keyValues() {
        return Object.values(this.table);
    }

    keys() {
        return this.keyValues().map(valuePair => valuePair.key);
    }

    //forEach 迭代键值对
    forEach(callbackFn) {
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
            if (result === false) {
                break;
            }
        }
    }
}


//--- 散列表 HashMap/HashTable---

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    //散列函数
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    //将键和值放入散列表
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    //从散列表中获取一个值
    get(key) {
        const valuePair = this.table[this.hashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    //从散列表中移除一个值
    remove(key) {
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }

}

// //散列表测试
// const hash = new HashTable();
// hash.put('Gandalf', 'gandalf@email.com');
// hash.put('John', 'johnsnow@email.com');
// hash.put('Tyrion', 'tyrion@email.com');

// //散列函数
// console.log(hash.hashCode('Gandalf') + ' - Gandalf');
// console.log(hash.hashCode('John') + ' - John');
// console.log(hash.hashCode('Tyrion') + ' - Tyrion');

// console.log(hash.get('Gandalf')); //gandalf@email.com
// console.log(hash.get('Loiane')); //undefined

// hash.remove('Gandalf');
// console.log(hash.get('Gandalf')); //undefined

//--- 解决散列冲突 ---
//1. 分离链接
class SepHashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    //重写 put 
    put(key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new LinkedList();
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }

    //重写 get
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }

    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    linkedList.remove(current.element);
                    if (linkedList.isEmpty()) {
                        delete this.table[position];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }

}

//--- ES2015 Map ---
// const map = new Map();
// map.set('Gandalf', 'gandalf@email.com');
// map.set('John', 'johnsnow@email.com');
// map.set('Tyrion', 'tyrion@email.com');

// console.log(map.has('Gandalf'));
// console.log(map.size);
// console.log(map.keys());
// console.log(map.values());
// console.log(map.get('Tyrion'));

//--- WeakMap ---
const map = new WeakMap();

const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

map.set(ob1, 'gandalf@email.com');
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');


