// Importing Libraries

import {
    CellularAutomaton,
    CellularAutomatonTypes,
} from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
import { convertGrid2dToMap } from "../scripts/grid-to-map-converter.js";
import { transform2d } from "../scripts/grid-transforms.js";
import { presets } from "../scripts/starting-state-presets.js";
import { BaseState, CompositionState } from "../scripts/state.js";
import { Vector } from "../scripts/vector.js";

// Declaring Constants and Variables
const startingState: CompositionState = new CompositionState(
    [
        new BaseState(
            convertGrid2dToMap(
                transform2d.rotate90cc(
                    presets.gameOfLife.generators.gosperGliderGun.grid
                )
            ),
            Vector.from([0, 0])
        ),
        new BaseState(
            convertGrid2dToMap(
                transform2d.rotate90cc(
                    presets.gameOfLife.generators.gosperGliderGun.grid
                )
            ),
            Vector.from([30, 0])
        ),
    ],
    Vector.from([0, 0])
);
const compiledStartingState =
    startingState.compile() as CellularAutomatonTypes.State;

const config: CellularAutomatonTypes.AutomataConfiguration = gameOfLifeConfig;

const DEBUG = true;

const SHOW_SCREEN = true;

config.startingState = compiledStartingState;

const grid: CellularAutomaton = new CellularAutomaton(
    config.startingState,
    config.cellInspectorFunction,
    config.evolverFunction,
    config.cellGetterFunction
);

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
    let iterationCount = 0;

    while (true) {
        DEBUG && console.time(`Frame ${iterationCount}`);

        // Getting the Bounding Box
        let gridState: CellularAutomatonTypes.State = new Map(
            [...grid.state.entries()].filter((i) => i[1] !== 0)
        );
        let gridStateVectorKeys: Array<Vector<number>> = [...gridState.keys()].map(i => Vector.from(JSON.parse(i)))
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
                        stateStringRepresentation += `${grid.getCell(`[${x},${y}]`, gridState) === 1 ? "#" : " "
                            } `;
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
        await delay(0);
    }
})();
