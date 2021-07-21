import { CellularAutomatonTypes, String2d } from "./cellular-automaton.js";
import { Grid2d } from "./grid.js";
import { CompositionState, CompositionStateArray } from "./state.js";
import { Vector } from "./vector.js";

export const convertMapToGrid2d = (gridState: CellularAutomatonTypes.State): Grid2d => {
    let gridStateVectorKeys: Array<Vector<number>> = [...gridState.keys()].map(i => Vector.from(JSON.parse(i)))
    let minX = Math.min(...gridStateVectorKeys.map(i => i.entries[0]));
    let maxX = Math.max(...gridStateVectorKeys.map(i => i.entries[0]));
    let minY = Math.min(...gridStateVectorKeys.map(i => i.entries[1]));
    let maxY = Math.max(...gridStateVectorKeys.map(i => i.entries[1]));
    let xLength = maxX - minX + 1;
    let yLength = maxY - minY + 1;
    let result: Grid2d = [...Array(yLength)].map((_, y) => [...Array(xLength)]);

    for(let y = minY; y <= maxY; y++) {
        for(let x = minX; x <= maxX; x++) {
            let newCoords = JSON.stringify([x, y]) as String2d;
            let cellValue = gridState.get(newCoords) ?? 0;
            result[y - minY][x - minX] = cellValue;
        }
    }

    return result;
}

export const convertStateArrayToMap = (gridState: CompositionStateArray): CellularAutomatonTypes.State => {
    return (new CompositionState(gridState)).compile();
}

export const convertStateArrayToGrid2d = (gridState: CompositionStateArray): Grid2d => {
    return convertMapToGrid2d((new CompositionState(gridState)).compile());
}