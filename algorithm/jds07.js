//----- Set -----
class Set {
    constructor() {
        this.items = {};
    }

    // has(element){
    //     return element in this.items;
    // }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }

    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }

    delete(element) {
        if (this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.values(this.items);
    }

    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    // intersection(otherSet) {
    //     const intersectionSet = new Set();
    //     const values = this.values();
    //     for (let i = 0; i < values.length; i++){
    //         if(otherSet.has(values[i])){
    //             intersectionSet.add(values[i]);
    //         }
    //     }
    //     return intersectionSet;
    // }

    //更少的迭代
    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }

    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    isSubsetOf(otherSet) {
        if(this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true;
        this.values().every(value => {
            if(!otherSet.has(value)){
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}

// const set = new Set();
// set.add(1);
// set.add(2);
// console.log(set.values());
// set.delete(2);
// console.log(set.size());
// set.clear();
// console.log(set.size());

// const setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);

// const setB = new Set();
// setB.add(3);
// setB.add(4);
// setB.add(5);
// setB.add(6);

// const unionAB = setA.union(setB);
// console.log(unionAB.values());

// const intersectionAB = setA.intersection(setB);
// console.log(intersectionAB.values());

//--- ECMA 2015 ---
