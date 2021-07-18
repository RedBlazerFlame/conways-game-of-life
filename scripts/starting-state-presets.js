import { CellularAutomaton } from "./cellular-automaton.js";
import { gameOfLifeConfig } from "./game-of-life-configuration.js";
import { convertGrid2dToMap } from "./grid-to-map-converter.js";
import { transform2d } from "./grid-transforms.js";
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
// Generators
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
            blinker: gameOfLife.getOscillatorStates(blinker, 2),
            toad: gameOfLife.getOscillatorStates(toad, 2),
            beacon: gameOfLife.getOscillatorStates(beacon, 2),
            pulsar: gameOfLife.getOscillatorStates(pulsar, 3)
        },
        spaceships: {
            glider: gameOfLife.getOscillatorStates(glider, 4),
            lightweightSpaceship: gameOfLife.getOscillatorStates(lightweightSpaceship, 4),
            middleweightSpaceship: gameOfLife.getOscillatorStates(middleweightSpaceship, 4),
            heavyweightSpaceship: gameOfLife.getOscillatorStates(heavyweightSpaceship, 4)
        },
        generators: {
            gosperGliderGun: gridMap(gosperGliderGun)
        },
        metuselahs: {
            rPentomino: gridMap(rPentomino)
        }
    }
};
