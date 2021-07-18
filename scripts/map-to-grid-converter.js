import { Vector } from "./vector.js";
export const convertMapToGrid2d = (gridState) => {
    var _a, _b, _c;
    let minX = Math.min(...[...gridState.keys()].map(i => i.entries[0]));
    let maxX = Math.max(...[...gridState.keys()].map(i => i.entries[0]));
    let minY = Math.min(...[...gridState.keys()].map(i => i.entries[1]));
    let maxY = Math.max(...[...gridState.keys()].map(i => i.entries[1]));
    let xLength = maxX - minX + 1;
    let yLength = maxY - minY + 1;
    let result = [...Array(yLength)].map((_, y) => [...Array(xLength)]);
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            let cellValue = (_c = (_b = (_a = [...gridState.entries()].filter((item) => Vector.equal(item[0], new Vector([x, y])))) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : 0;
            result[y - minY][x - minX] = cellValue;
        }
    }
    return result;
};
