export const transform2d = {
    flipX: (grid2d) => {
        let gridCopy = [];
        Object.assign(gridCopy, grid2d);
        return gridCopy.map(i => i.reverse());
    },
    flipY: (grid2d) => {
        let gridCopy = [];
        Object.assign(gridCopy, grid2d);
        return gridCopy.reverse();
    },
    rotate180: (grid2d) => transform2d.flipX(transform2d.flipY(grid2d)),
    rotate90c: (grid2d) => {
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
    rotate90cc: (grid2d) => {
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
};
