import { CellularAutomatonTypes } from "./cellular-automaton.js";
import { Vector } from "./vector.js";

export type StateType = "Base" | "Composition";
export type CompositionStateArray = Array<BaseState | CompositionState>;

export class BaseState {
    private __state: CellularAutomatonTypes.State;
    private __origin: Vector<number>;
    private __type: StateType = "Base";

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
    public compile(): CellularAutomatonTypes.State {
        let compiledState: CellularAutomatonTypes.State = new Map();

        for(let entry of this.__state.entries()) {
            compiledState.set(Vector.add(this.__origin, entry[0]), entry[1]);
        }

        return compiledState;
    }

    constructor(initState: CellularAutomatonTypes.State = new Map([]), origin: Vector<number> = new Vector([0, 0])) {
        this.__state = initState;
        this.__origin = origin;
    }
}

export class CompositionState {
    private __state: CompositionStateArray;
    private __origin: Vector<number>;
    private __type: StateType = "Composition";

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
    public compile(): CellularAutomatonTypes.State {
        let compiledStates: Array<CellularAutomatonTypes.State> = this.__state.map(i => i.compile());
        let reducedState: CellularAutomatonTypes.State = compiledStates.reduce((acc, cur) => new Map([...acc, ...cur]), new Map([]));
        let resultState: CellularAutomatonTypes.State = new Map([]);
        let addedKeys: Array<string> = [];

        for(let entry of reducedState.entries()) {
            if(! addedKeys.includes(JSON.stringify(Vector.add(this.__origin, entry[0])))) {
                resultState.set(Vector.add(this.__origin, entry[0]), entry[1]);
                addedKeys.push(JSON.stringify(Vector.add(this.__origin, entry[0])));
            }
        }

        return resultState;
    }

    constructor(initState: CompositionStateArray, origin: Vector<number>) {
        this.__state = initState;
        this.__origin = origin;
    }
}