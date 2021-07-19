import { convertGrid2dToMap } from "./grid-to-map-converter.js";
import { convertMapToGrid2d } from "./map-to-grid-converter.js";
export class CellularAutomaton {
    constructor(initState = new Map([]), getCellsToInspect = (oldState) => [], evolver = (position, oldState, oldGridState) => 0, cellGetterFunction = (position, state) => 0) {
        this.__state = initState;
        this.__getCellsToInspect = getCellsToInspect;
        this.__evolver = evolver;
        this.__cellGetterFunction = cellGetterFunction;
    }
    get state() {
        return this.__state;
    }
    get getCell() {
        return this.__cellGetterFunction;
    }
    get newState() {
        let cellsToInspect = this.__getCellsToInspect(this.__state);
        let newState = new Map();
        for (let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, this.__evolver(cellToInspect, this.__cellGetterFunction(cellToInspect, this.__state), this.__state, this.__cellGetterFunction));
        }
        return newState;
    }
    getNewState() {
        let cellsToInspect = this.__getCellsToInspect(this.__state);
        let newState = new Map();
        for (let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, this.__evolver(cellToInspect, this.__cellGetterFunction(cellToInspect, this.__state), this.__state, this.__cellGetterFunction));
        }
        return newState;
    }
    getNewStateFromParameters(oldState = this.__state, getCellsToInspect = this.__getCellsToInspect, evolver = this.__evolver, cellGetterFunction = this.__cellGetterFunction) {
        let cellsToInspect = getCellsToInspect(oldState);
        let newState = new Map();
        for (let cellToInspect of cellsToInspect) {
            newState.set(cellToInspect, evolver(cellToInspect, cellGetterFunction(cellToInspect, oldState), oldState, cellGetterFunction));
        }
        return newState;
    }
    getStateHistory(startingState, historyLength) {
        let history = [startingState];
        while (history.length < historyLength) {
            let nextFrame = this.getNewStateFromParameters(history[history.length - 1]);
            let newFrame = new Map([]);
            for (let entry of nextFrame.entries()) {
                if (entry[1] !== 0) {
                    newFrame.set(entry[0], entry[1]);
                }
            }
            history.push(newFrame);
        }
        return history;
    }
    getOscillatorStates(startingState, historyLength) {
        let history = this.getStateHistory(convertGrid2dToMap(startingState), historyLength);
        return history.map(i => ({
            grid: convertMapToGrid2d(i),
            map: i
        }));
    }
    getOscillatorStatesMap(startingState, historyLength) {
        let history = this.getStateHistory(startingState, historyLength);
        return history.map(i => ({
            grid: convertMapToGrid2d(i),
            map: i
        }));
    }
    updateState(newState) {
        this.__state = newState;
        return this;
    }
    evolveState() {
        this.__state = this.getNewState();
        return this;
    }
}
