// Importing Libraries
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CellularAutomaton, } from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
import { convertGrid2dToMap } from "../scripts/grid-to-map-converter.js";
import { transform2d } from "../scripts/grid-transforms.js";
import { presets } from "../scripts/starting-state-presets.js";
import { BaseState, CompositionState } from "../scripts/state.js";
import { Vector } from "../scripts/vector.js";
// Declaring Constants and Variables
const startingState = new CompositionState([
    new BaseState(convertGrid2dToMap(transform2d.rotate90cc(presets.gameOfLife.generators.gosperGliderGun.grid)), Vector.from([0, 0])),
    new BaseState(convertGrid2dToMap(transform2d.rotate90cc(presets.gameOfLife.generators.gosperGliderGun.grid)), Vector.from([30, 0])),
], Vector.from([0, 0]));
const compiledStartingState = startingState.compile();
const config = gameOfLifeConfig;
const DEBUG = true;
const SHOW_SCREEN = true;
config.startingState = compiledStartingState;
const grid = new CellularAutomaton(config.startingState, config.cellInspectorFunction, config.evolverFunction, config.cellGetterFunction);
// Declaring Functions
function delay(timeDelay) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeDelay);
        });
    });
}
// Updating State
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let iterationCount = 0;
        while (true) {
            DEBUG && console.time(`Frame ${iterationCount}`);
            // Getting the Bounding Box
            let gridState = new Map([...grid.state.entries()].filter((i) => i[1] !== 0));
            let gridStateVectorKeys = [...gridState.keys()].map(i => Vector.from(JSON.parse(i)));
            let minX = Math.min(...gridStateVectorKeys.map(i => i.entries[0]));
            let maxX = Math.max(...gridStateVectorKeys.map(i => i.entries[0]));
            let minY = Math.min(...gridStateVectorKeys.map(i => i.entries[1]));
            let maxY = Math.max(...gridStateVectorKeys.map(i => i.entries[1]));
            // Constructing the String Representation of the State
            SHOW_SCREEN &&
                (function () {
                    let stateStringRepresentation = "";
                    for (let y = Math.min(maxY, 40); y >= Math.max(minY, -40); y--) {
                        for (let x = Math.max(minX, -40); x <= Math.min(maxX, 40); x++) {
                            // for(let y = maxY; y >= minY; y--) {
                            //     for(let x = minX; x <= maxX; x++) {
                            stateStringRepresentation += `${grid.getCell(`[${x},${y}]`, gridState) === 1 ? "#" : " "} `;
                        }
                        stateStringRepresentation += "\n";
                    }
                    // Logging the String Representation of the State
                    console.clear();
                    console.log("==========================");
                    console.log(`Iteration ${iterationCount}\nBounding Box - (${minX}, ${minY}) to (${maxX}, ${maxY})`);
                    console.log("==========================");
                    console.log(stateStringRepresentation);
                })();
            // Updating State
            grid.evolveState();
            DEBUG && console.timeEnd(`Frame ${iterationCount}`);
            iterationCount++;
            // Delaying by 1 second until the next frame
            yield delay(0);
        }
    });
})();
