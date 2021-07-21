import { CellularAutomaton } from "./cellular-automaton.js";
import { gameOfLifeConfig } from "./game-of-life-configuration.js";
import { convertGrid2dToMap } from "./grid-to-map-converter.js";
import { transform2d } from "./transforms.js";
import { convertMapToGrid2d } from "./map-to-grid-converter.js";
import { ones, zeros } from "./utils.js";
// The game of life simulator. To be used in evolving states of oscillators
const gameOfLife = new CellularAutomaton(gameOfLifeConfig.startingState, gameOfLifeConfig.cellInspectorFunction, gameOfLifeConfig.evolverFunction, gameOfLifeConfig.cellGetterFunction);
// Converts a grid to grid and map
export function gridMap(grid) {
    return {
        grid: grid,
        map: convertGrid2dToMap(grid)
    };
}
// Converts a Grid to an array of grids and map
export function gridMapHistory(grid, period = 1) {
    return {
        states: gameOfLife.getOscillatorStates(grid, period),
        period: period
    };
}
// Converts a map to grid and map
export function gridMapFromMap(map) {
    return {
        grid: convertMapToGrid2d(map),
        map: map
    };
}
// Still Lifes
let block = transform2d.flipY([
    [1, 1],
    [1, 1]
]);
let beehive = transform2d.flipY([
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]);
let loaf = transform2d.flipY([
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 0]
]);
let boat = transform2d.flipY([
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]);
let tub = transform2d.flipY([
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]);
// Oscillators
let blinker = transform2d.flipY([
    ones(3)
]);
let toad = transform2d.flipY([
    [0, 1, 1, 1],
    [1, 1, 1, 0]
]);
let beacon = transform2d.flipY([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 1]
]);
let pulsar = transform2d.flipY([
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    zeros(13),
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    zeros(13),
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    zeros(13),
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
]);
// Spaceships
let glider = transform2d.flipY([
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1]
]);
let lightweightSpaceship = transform2d.flipY([
    [1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1]
]);
let middleweightSpaceship = transform2d.flipY([
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1]
]);
let heavyweightSpaceship = transform2d.flipY([
    [0, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1]
]);
// Guns
let gosperGliderGun = transform2d.flipY([
    [...zeros(24), 1, ...zeros(11)],
    [...zeros(22), 1, 0, 1, ...zeros(11)],
    [...zeros(12), ...ones(2), ...zeros(6), ...ones(2), ...zeros(12), ...ones(2)],
    [...zeros(11), 1, ...zeros(3), 1, ...zeros(4), ...ones(2), ...zeros(12), ...ones(2)],
    [...ones(2), ...zeros(8), 1, ...zeros(5), 1, ...zeros(3), ...ones(2), ...zeros(14)],
    [...ones(2), ...zeros(8), 1, ...zeros(3), 1, 0, ...ones(2), ...zeros(4), 1, 0, 1, ...zeros(11)],
    [...zeros(10), 1, ...zeros(5), 1, ...zeros(7), 1, ...zeros(11)],
    [...zeros(11), 1, ...zeros(3), 1, ...zeros(20)],
    [...zeros(12), ...ones(2), ...zeros(22)]
]);
// Metuselahs
let rPentomino = transform2d.flipY([
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0]
]);
export const presets = {
    gameOfLife: {
        stillLifes: {
            block: gridMap(block),
            beehive: gridMap(beehive),
            loaf: gridMap(loaf),
            boat: gridMap(boat),
            tub: gridMap(tub)
        },
        oscillators: {
            blinker: gridMapHistory(blinker, 2),
            toad: gridMapHistory(toad, 2),
            beacon: gridMapHistory(beacon, 2),
            pulsar: gridMapHistory(pulsar, 3)
        },
        spaceships: {
            glider: gridMapHistory(glider, 4),
            lightweightSpaceship: gridMapHistory(lightweightSpaceship, 4),
            middleweightSpaceship: gridMapHistory(middleweightSpaceship, 4),
            heavyweightSpaceship: gridMapHistory(heavyweightSpaceship, 4)
        },
        guns: {
            gosperGliderGun: gridMap(gosperGliderGun)
        },
        metuselahs: {
            rPentomino: gridMap(rPentomino)
        }
    }
};
