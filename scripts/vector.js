export class Vector {
    constructor(initEntries = []) {
        this.__entries = initEntries;
    }
    get entries() {
        return this.__entries;
    }
    set entries(array) {
        if (array.length === this.__entries.length) {
            this.__entries = array;
        }
        else {
            console.trace();
            throw `ValueError: Cannot set property __entries with length ${this.__entries.length} to an array with length ${array.length}`;
        }
    }
    static from(array) {
        return new Vector(array);
    }
    setEntries(array) {
        if (array.length === this.__entries.length) {
            this.__entries = array;
        }
        else {
            console.trace();
            throw `ValueError: Cannot set property __entries with length ${this.__entries.length} to an array with length ${array.length}`;
        }
        return this;
    }
    setEntriesLax(array) {
        this.__entries = array;
        return this;
    }
    multiplyByScalar(num) {
        if (typeof this.__entries[0] === "number") {
            return new Vector(this.__entries.map(i => i * num));
        }
        else {
            throw `ValueError: Cannot Multiply typeof Vector<${typeof this.__entries[0]}> with number`;
        }
    }
    static zerosLike(vec) {
        return new Vector(vec.entries.map(i => 0));
    }
    static onesLike(vec) {
        return new Vector(vec.entries.map(i => 1));
    }
    static like(num, vec) {
        return new Vector(vec.entries.map(i => num));
    }
    static add(vec1, vec2) {
        return new Vector(vec1.entries.map((item, index) => item + vec2.entries[index]));
    }
    static sub(vec1, vec2) {
        return new Vector(vec1.entries.map((item, index) => item - vec2.entries[index]));
    }
    static addAll(...vecs) {
        return vecs.reduce((acc, cur) => Vector.add(acc, cur), Vector.zerosLike(vecs[0]));
    }
    static equal(vec1, vec2) {
        return vec1.entries.reduce((acc, cur, index) => acc && (cur === vec2.entries[index]), true);
    }
}
