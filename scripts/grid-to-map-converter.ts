import { CellularAutomatonTypes, String2d } from "./cellular-automaton.js";
import { Grid2d } from "./grid.js";
import { Vector } from "./vector.js";

export const convertGrid2dToMap = (grid: Grid2d, origin: Vector<number> = new Vector([0, 0])): CellularAutomatonTypes.State => {
    let gridDimensions = {
        x: grid[0].length,
        y: grid.length
    };
    let result: CellularAutomatonTypes.State = new Map([]);

    for(let y = 0; y < gridDimensions.y; y++) {
        for(let x = 0; x < gridDimensions.x; x++) {
            if(grid[y][x] !== 0) {
                result.set(JSON.stringify(Vector.sub(new Vector([x, y]), origin).entries) as String2d, grid[y][x]);
            }
        }
    }

    return result;
}