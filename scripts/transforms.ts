import { CellularAutomatonTypes } from "./cellular-automaton.js";
import { convertGrid2dToMap } from "./grid-to-map-converter.js";
import { Grid2d } from "./grid.js";
import { convertMapToGrid2d } from "./map-to-grid-converter.js";

export const transform2d = {
    flipX: (grid2d: Grid2d): Grid2d => {
        let gridCopy: Grid2d = [];
        Object.assign(gridCopy, grid2d);
        return gridCopy.map(i => i.reverse());
    },
    flipY: (grid2d: Grid2d): Grid2d => {
        let gridCopy: Grid2d = [];
        Object.assign(gridCopy, grid2d);
        return gridCopy.reverse();
    },
    rotate180: (grid2d: Grid2d): Grid2d => transform2d.flipX(transform2d.flipY(grid2d)),
    rotate90c: (grid2d: Grid2d): Grid2d => {
        let gridDimensions = {
            x: grid2d[0].length,
            y: grid2d.length
        };

        let resultGridDimensions = {
            x: gridDimensions.y,
            y: gridDimensions.x
        };

        let resultGrid = [...Array(resultGridDimensions.y)].map(row => [...Array(resultGridDimensions.x)]);

        return resultGrid.map((row, y) => row.map((i, x) => grid2d[x][gridDimensions.x - y - 1]));
    },
    rotate90cc: (grid2d: Grid2d): Grid2d => {
        let gridDimensions = {
            x: grid2d[0].length,
            y: grid2d.length
        };

        let resultGridDimensions = {
            x: gridDimensions.y,
            y: gridDimensions.x
        };

        let resultGrid = [...Array(resultGridDimensions.y)].map(row => [...Array(resultGridDimensions.x)]);

        return resultGrid.map((row, y) => row.map((i, x) => grid2d[gridDimensions.y - x - 1][y]));
    }
}

export const transform2dMap = {
    flipX: (map: CellularAutomatonTypes.State): CellularAutomatonTypes.State => {
        return convertGrid2dToMap(transform2d.flipX(convertMapToGrid2d(map)))
    },
    flipY: (map: CellularAutomatonTypes.State): CellularAutomatonTypes.State => {
        return convertGrid2dToMap(transform2d.flipY(convertMapToGrid2d(map)))
    },
    rotate180: (map: CellularAutomatonTypes.State): CellularAutomatonTypes.State => {
        return convertGrid2dToMap(transform2d.rotate180(convertMapToGrid2d(map)))
    },
    rotate90c: (map: CellularAutomatonTypes.State): CellularAutomatonTypes.State => {
        return convertGrid2dToMap(transform2d.rotate90c(convertMapToGrid2d(map)))
    },
    rotate90cc: (map: CellularAutomatonTypes.State): CellularAutomatonTypes.State => {
        return convertGrid2dToMap(transform2d.rotate90cc(convertMapToGrid2d(map)))
    }
}