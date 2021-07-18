import { Vector } from "./vector.js";
export class BaseState {
    constructor(initState = new Map([]), origin = new Vector([0, 0])) {
        this.__type = "Base";
        this.__state = initState;
        this.__origin = origin;
    }
    get state() {
        return this.__state;
    }
    get origin() {
        return this.__origin;
    }
    get type() {
        return this.__type;
    }
    // Compiles the state into a format that can be understood by the CellularAutomaton class (i.e., into a simple CellularAutomatonTypes.State Map)
    compile() {
        let compiledState = new Map();
        for (let entry of this.__state.entries()) {
            compiledState.set(Vector.add(this.__origin, entry[0]), entry[1]);
        }
        return compiledState;
    }
}
export class CompositionState {
    constructor(initState, origin) {
        this.__type = "Composition";
        this.__state = initState;
        this.__origin = origin;
    }
    get state() {
        return this.__state;
    }
    get origin() {
        return this.__origin;
    }
    get type() {
        return this.__type;
    }
    // Compiles the state into a format that can be understood by the CellularAutomaton class (i.e., into a simple CellularAutomatonTypes.State Map)
    compile() {
        let compiledStates = this.__state.map(i => i.compile());
        let reducedState = compiledStates.reduce((acc, cur) => new Map([...acc, ...cur]), new Map([]));
        let resultState = new Map([]);
        let addedKeys = [];
        for (let entry of reducedState.entries()) {
            if (!addedKeys.includes(JSON.stringify(Vector.add(this.__origin, entry[0])))) {
                resultState.set(Vector.add(this.__origin, entry[0]), entry[1]);
                addedKeys.push(JSON.stringify(Vector.add(this.__origin, entry[0])));
            }
        }
        return resultState;
    }
}
