import { CellularAutomatonTypes } from "./cellular-automaton";
import { Grid2d } from "./grid.js";
import { Vector } from "./vector.js";

export const convertMapToGrid2d = (gridState: CellularAutomatonTypes.State): Grid2d => {
    let minX = Math.min(...[...gridState.keys()].map(i => i.entries[0]));
    let maxX = Math.max(...[...gridState.keys()].map(i => i.entries[0]));
    let minY = Math.min(...[...gridState.keys()].map(i => i.entries[1]));
    let maxY = Math.max(...[...gridState.keys()].map(i => i.entries[1]));
    let xLength = maxX - minX + 1;
    let yLength = maxY - minY + 1;
    let result: Grid2d = [...Array(yLength)].map((_, y) => [...Array(xLength)]);

    for(let y = minY; y <= maxY; y++) {
        for(let x = minX; x <= maxX; x++) {
            let cellValue = [...gridState.entries()].filter((item) => Vector.equal(item[0], new Vector([x, y])))?.[0]?.[1] ?? 0;
            result[y - minY][x - minX] = cellValue;
        }
    }

    return result;
}