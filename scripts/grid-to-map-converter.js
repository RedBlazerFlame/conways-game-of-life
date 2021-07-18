import { Vector } from "./vector.js";
export const convertGrid2dToMap = (grid, origin = new Vector([0, 0])) => {
    let gridDimensions = {
        x: grid[0].length,
        y: grid.length
    };
    let result = new Map([]);
    for (let y = 0; y < gridDimensions.y; y++) {
        for (let x = 0; x < gridDimensions.x; x++) {
            if (grid[y][x] !== 0) {
                result.set(Vector.sub(new Vector([x, y]), origin), grid[y][x]);
            }
        }
    }
    return result;
};
