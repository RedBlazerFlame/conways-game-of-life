var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importing Libraries
import { readFile } from "fs/promises";
import path from "path/posix";
import { CellularAutomaton, } from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
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
        // Declaring Constants and Variables
        const startingState = new Map(JSON.parse(yield readFile(path.join(".", "patterns-json", `turingmachine.json`), { encoding: "utf-8" })));
        const compiledStartingState = startingState;
        const config = gameOfLifeConfig;
        const SCREEN_MIN_X = -20;
        const SCREEN_MIN_Y = -20;
        const SCREEN_MAX_X = 20;
        const SCREEN_MAX_Y = 20;
        config.startingState = compiledStartingState;
        const grid = new CellularAutomaton(config.startingState, config.cellInspectorFunction, config.evolverFunction, config.cellGetterFunction);
        // Beginning Test Loop
        let iterationCount = 0;
        let start;
        let totalTime = 0;
        for (let i = 0; i < 10; i++) {
            start = Date.now();
            grid.evolveState();
            totalTime += Date.now() - start;
            iterationCount++;
            console.log(`Frame ${iterationCount}`);
        }
        console.log(`Total Time - ${totalTime}ms`);
    });
})();
