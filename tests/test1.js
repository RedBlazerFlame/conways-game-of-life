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
import { presets } from "../scripts/starting-state-presets.js";
import { Vector } from "../scripts/vector.js";
// Declaring Constants and Variables
const startingState = presets.gameOfLife.metuselahs.rPentomino.map;
const compiledStartingState = startingState;
const config = gameOfLifeConfig;
const DEBUG = true;
const SHOW_SCREEN = true;
const SCREEN_MIN_X = -80;
const SCREEN_MIN_Y = -80;
const SCREEN_MAX_X = 80;
const SCREEN_MAX_Y = 80;
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
                    // for (let y = Math.min(maxY, SCREEN_MAX_Y); y >= Math.max(minY, SCREEN_MIN_Y); y--) {
                    //     for (let x = Math.max(minX, SCREEN_MIN_X); x <= Math.min(maxX, SCREEN_MAX_X); x++) {
                    for (let y = maxY; y >= minY; y--) {
                        for (let x = minX; x <= maxX; x++) {
                            stateStringRepresentation += `${(grid.getCell(`[${x},${y}]`, gridState) === 1 ? "#" : " ")} `;
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
            yield delay(3);
        }
    });
})();
