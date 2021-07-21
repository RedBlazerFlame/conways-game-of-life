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
    const startingState = new Map(JSON.parse(await readFile(path.join(".", "patterns-json", `pentadecathlon.json`), {encoding: "utf-8"})));

    const compiledStartingState = startingState as CellularAutomatonTypes.State;

    const config: CellularAutomatonTypes.AutomataConfiguration = gameOfLifeConfig;

    const DEBUG = true;

    const SHOW_SCREEN = true;

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

    // Beginning Draw Loop
    let iterationCount = 0;

    while (true) {
        DEBUG && console.time(`Frame ${iterationCount}`);

        // Getting the Bounding Box
        let gridState: CellularAutomatonTypes.State = new Map(
            [...grid.state.entries()].filter((i) => i[1] !== 0)
        );

        

        // Constructing the String Representation of the State
        SHOW_SCREEN &&
            (function () {
                let gridStateVectorKeys: Array<Vector<number>> = [...gridState.keys()].map(i => Vector.from(JSON.parse(i)))
                let minX = Math.min(...gridStateVectorKeys.map(i => i.entries[0]));
                let maxX = Math.max(...gridStateVectorKeys.map(i => i.entries[0]));
                let minY = Math.min(...gridStateVectorKeys.map(i => i.entries[1]));
                let maxY = Math.max(...gridStateVectorKeys.map(i => i.entries[1]));
                let stateStringRepresentation = "";

                // for (let y = Math.min(maxY, SCREEN_MAX_Y); y >= Math.max(minY, SCREEN_MIN_Y); y--) {
                //     for (let x = Math.max(minX, SCREEN_MIN_X); x <= Math.min(maxX, SCREEN_MAX_X); x++) {
                for (let y =  SCREEN_MAX_Y; y >=SCREEN_MIN_Y; y--) {
                    for (let x = SCREEN_MIN_X; x <= SCREEN_MAX_X; x++) {
                // for (let y = maxY; y >= minY; y--) {
                //     for (let x = minX; x <= maxX; x++) {
                        stateStringRepresentation += `${(grid.getCell(`[${x},${y}]`, gridState) === 1 ? "#" : " ")} `;
                    }
                    stateStringRepresentation += "\n";
                }

                // Logging the String Representation of the State
                console.clear();
                console.log("==========================");
                console.log(
                    `Iteration ${iterationCount}\nBounding Box - (${minX}, ${minY}) to (${maxX}, ${maxY})`
                );
                console.log("==========================");
                console.log(stateStringRepresentation);
            })();

        // Updating State
        grid.evolveState();

        DEBUG && console.timeEnd(`Frame ${iterationCount}`);

        iterationCount++;

        // Delaying by 1 second until the next frame
        await delay(5);
    }
})();
