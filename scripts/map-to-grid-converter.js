import { Vector } from "./vector.js";
export const convertMapToGrid2d = (gridState) => {
    var _a;
    let gridStateVectorKeys = [...gridState.keys()].map(i => Vector.from(JSON.parse(i)));
    let minX = Math.min(...gridStateVectorKeys.map(i => i.entries[0]));
    let maxX = Math.max(...gridStateVectorKeys.map(i => i.entries[0]));
    let minY = Math.min(...gridStateVectorKeys.map(i => i.entries[1]));
    let maxY = Math.max(...gridStateVectorKeys.map(i => i.entries[1]));
    let xLength = maxX - minX + 1;
    let yLength = maxY - minY + 1;
    let result = [...Array(yLength)].map((_, y) => [...Array(xLength)]);
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            let newCoords = JSON.stringify([x, y]);
            let cellValue = (_a = gridState.get(newCoords)) !== null && _a !== void 0 ? _a : 0;
            result[y - minY][x - minX] = cellValue;
        }
    }
    return result;
};
