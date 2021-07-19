import { convertGrid2dToMap } from "./grid-to-map-converter.js";
import { Grid2d } from "./grid.js";
import { convertMapToGrid2d } from "./map-to-grid-converter.js";
import { Vector } from "./vector.js";

export type String2d = `[${number},${number}]`;
export namespace CellularAutomatonTypes {
    export type State = Map<String2d, number>;
    export type CellInspectorFunction = (oldState: CellularAutomatonTypes.State) => Array<String2d>;
    export type EvolverFunction = (position: String2d, oldState: number, oldGridState: CellularAutomatonTypes.State, cellGetterFunction: CellularAutomatonTypes.CellGetterFunction) => number;
    export type CellGetterFunction = (position: String2d, state: CellularAutomatonTypes.State) => number;
    export type AutomataConfiguration = {
        startingState: CellularAutomatonTypes.State,
        evolverFunction: CellularAutomatonTypes.EvolverFunction,
        cellInspectorFunction: CellularAutomatonTypes.CellInspectorFunction,
        cellGetterFunction: CellularAutomatonTypes.CellGetterFunction
    };
}
export class CellularAutomaton {
    
    private __state: CellularAutomatonTypes.State;
    private __getCellsToInspect: CellularAutomatonTypes.CellInspectorFunction;
    private __evolver: CellularAutomatonTypes.EvolverFunction;
    private __cellGetterFunction: CellularAutomatonTypes.CellGetterFunction;

    get state(): CellularAutomatonTypes.State {
        return this.__state;
    }

    get getCell(): CellularAutomatonTypes.CellGetterFunction {
        return this.__cellGetterFunction;
    }

    get newState(): CellularAutomatonTypes.State {
        let cellsToInspect: Array<String2d> = this.__getCellsToInspect(this.__state);
        let newState: CellularAutomatonTypes.State = new Map();

        for(let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, this.__evolver(cellToInspect, this.__cellGetterFunction(cellToInspect, this.__state), this.__state, this.__cellGetterFunction));
        }

        return newState;
    }

    public getNewState(): CellularAutomatonTypes.State {
        let cellsToInspect: Array<String2d> = this.__getCellsToInspect(this.__state);
        let newState: CellularAutomatonTypes.State = new Map();

        for(let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, this.__evolver(cellToInspect, this.__cellGetterFunction(cellToInspect, this.__state), this.__state, this.__cellGetterFunction));
        }

        return newState;
    }

    public getNewStateFromParameters(oldState = this.__state, getCellsToInspect = this.__getCellsToInspect, evolver = this.__evolver, cellGetterFunction = this.__cellGetterFunction): CellularAutomatonTypes.State {
        let cellsToInspect: Array<String2d> = getCellsToInspect(oldState);
        let newState: CellularAutomatonTypes.State = new Map();

        for(let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, evolver(cellToInspect, cellGetterFunction(cellToInspect, oldState), oldState, cellGetterFunction));
        }

        return newState;
    }

    public getStateHistory(startingState: CellularAutomatonTypes.State, historyLength: number): Array<CellularAutomatonTypes.State> {
        let history: Array<CellularAutomatonTypes.State> = [startingState];

        while(history.length < historyLength) {
            let nextFrame = this.getNewStateFromParameters(history[history.length - 1]);

            let newFrame: CellularAutomatonTypes.State = new Map([]);

            for(let entry of nextFrame.entries()) {
                if( entry[1] !== 0 ){
                    newFrame.set(entry[0], entry[1]);
                }
            }

            history.push(newFrame);
        }

        return history;
    }

    public getOscillatorStates(startingState: Grid2d, historyLength: number): Array<{grid: Grid2d, map: CellularAutomatonTypes.State}> {
        let history = this.getStateHistory(convertGrid2dToMap(startingState), historyLength);
        return history.map(i => ({
            grid: convertMapToGrid2d(i),
            map: i
        }));
    }

    public getOscillatorStatesMap(startingState: CellularAutomatonTypes.State, historyLength: number): Array<{grid: Grid2d, map: CellularAutomatonTypes.State}> {
        let history = this.getStateHistory(startingState, historyLength);
        return history.map(i => ({
            grid: convertMapToGrid2d(i),
            map: i
        }));
    }

    public updateState(newState: CellularAutomatonTypes.State): CellularAutomaton {
        this.__state = newState;

        return this;
    }

    public evolveState(): CellularAutomaton {
        this.__state = this.getNewState();

        return this;
    }

    constructor(initState: CellularAutomatonTypes.State = new Map([]), getCellsToInspect: CellularAutomatonTypes.CellInspectorFunction = (oldState: CellularAutomatonTypes.State) => [], evolver: CellularAutomatonTypes.EvolverFunction = (position: String2d, oldState: number, oldGridState: CellularAutomatonTypes.State) => 0, cellGetterFunction: CellularAutomatonTypes.CellGetterFunction = (position, state) => 0) {
        this.__state = initState;
        this.__getCellsToInspect = getCellsToInspect;
        this.__evolver = evolver;
        this.__cellGetterFunction = cellGetterFunction;
    }
}