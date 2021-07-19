export class Vector<T> {
    private __entries: Array<T>;

    get entries(): Array<T> {
        return this.__entries;
    }

    set entries(array: Array<T>) {
        if(array.length === this.__entries.length) {
            this.__entries = array;
        }
        else {
            console.trace();
            throw `ValueError: Cannot set property __entries with length ${this.__entries.length} to an array with length ${array.length}`;
        }
    }

    public static from<T>(array: Array<T>): Vector<T> {
        return new Vector(array);
    }

    public setEntries(array: Array<T>): Vector<T> {
        if(array.length === this.__entries.length) {
            this.__entries = array;
        }
        else {
            console.trace();
            throw `ValueError: Cannot set property __entries with length ${this.__entries.length} to an array with length ${array.length}`;
        }
        return this;
    }

    public setEntriesLax(array: Array<T>): Vector<T> {
        this.__entries = array;
        return this;
    }

    public multiplyByScalar(num: number): Vector<number> {
        if(typeof this.__entries[0] === "number") {
            return new Vector(this.__entries.map(i => (i as unknown as number) * num));
        }
        else {
            throw `ValueError: Cannot Multiply typeof Vector<${typeof this.__entries[0]}> with number`;
        }
    }

    public static zerosLike(vec: Vector<number>) {
        return new Vector(vec.entries.map(i => 0));
    }

    public static onesLike(vec: Vector<number>) {
        return new Vector(vec.entries.map(i => 1));
    }

    public static like(num: number, vec: Vector<number>) {
        return new Vector(vec.entries.map(i => num));
    }

    public static add(vec1: Vector<number>, vec2: Vector<number>): Vector<number> {
        return new Vector(vec1.entries.map((item, index) => item + vec2.entries[index]));
    }

    public static sub(vec1: Vector<number>, vec2: Vector<number>): Vector<number> {
        return new Vector(vec1.entries.map((item, index) => item - vec2.entries[index]));
    }

    public static addAll(...vecs: Array<Vector<number>>): Vector<number> {
        return vecs.reduce((acc, cur) => Vector.add(acc, cur), Vector.zerosLike(vecs[0]));
    }

    public static equal<T>(vec1: Vector<T>, vec2: Vector<T>): boolean {
        return vec1.entries.reduce((acc, cur, index) => acc && (cur === vec2.entries[index]), true);
    }

    constructor(initEntries: Array<T> = []) {
        this.__entries = initEntries;
    }
}