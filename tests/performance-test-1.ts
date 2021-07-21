// Importing Libraries
import { readFile } from "fs/promises";
import path from "path/posix";
import {
    CellularAutomaton,
    CellularAutomatonTypes,
} from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
import { convertGrid2dToMap } from "../scripts/grid-to-map-converter.js";
import { transform2d } from "../scripts/transforms.js";
import { convertStateArrayToGrid2d } from "../scripts/map-to-grid-converter.js";
import { presets } from "../scripts/starting-state-presets.js";
import { BaseState, CompositionState, CompositionStateArray } from "../scripts/state.js";
import { Vector } from "../scripts/vector.js";

// Declaring Functions
async function delay(timeDelay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeDelay);
    });
}

// Updating State
(async function main() {
    // Declaring Constants and Variables
    const startingState = new Map(JSON.parse(await readFile(path.join(".", "patterns-json", `turingmachine.json`), {encoding: "utf-8"})));

    const compiledStartingState = startingState as CellularAutomatonTypes.State;

    const config: CellularAutomatonTypes.AutomataConfiguration = gameOfLifeConfig;

    const SCREEN_MIN_X = -20;
    const SCREEN_MIN_Y = -20;
    const SCREEN_MAX_X = 20;
    const SCREEN_MAX_Y = 20;

    config.startingState = compiledStartingState;

    const grid: CellularAutomaton = new CellularAutomaton(
        config.startingState,
        config.cellInspectorFunction,
        config.evolverFunction,
        config.cellGetterFunction
    );

    // Beginning Test Loop
    let iterationCount = 0;


    let start;

    let totalTime = 0;

    for (let i = 0; i < 10; i++) {
        start = Date.now();

        grid.evolveState();
        
        totalTime += Date.now() - start;

        iterationCount++;
        console.log(`Frame ${iterationCount}`)
    }

    console.log(`Total Time - ${totalTime}ms`)
})();
