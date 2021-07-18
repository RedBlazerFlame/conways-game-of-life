// Importing Libraries

import { CellularAutomaton, CellularAutomatonTypes } from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
import { convertGrid2dToMap } from "../scripts/grid-to-map-converter.js";
import { transform2d } from "../scripts/grid-transforms.js";
import { presets } from "../scripts/starting-state-presets.js";
import { Vector } from "../scripts/vector.js";


// Declaring Constants and Variables
const startingState = presets.gameOfLife.oscillators.pulsar[0].map as CellularAutomatonTypes.State

const config: CellularAutomatonTypes.AutomataConfiguration = gameOfLifeConfig;

config.startingState = startingState;

console.log(config.cellInspectorFunction(config.startingState));

const grid: CellularAutomaton = new CellularAutomaton(config.startingState, config.cellInspectorFunction, config.evolverFunction, config.cellGetterFunction);

// Declaring Functions
async function delay(timeDelay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(
            () => {
                resolve();
            },
            timeDelay
        )
    });
}

// Updating State
(async function main() {
    let iterationCount = 0;

    while(true) {
        // Getting the Bounding Box
        let gridState = grid.state;
        let minX = Math.min(...[...gridState.keys()].map(i => i.entries[0]));
        let maxX = Math.max(...[...gridState.keys()].map(i => i.entries[0]));
        let minY = Math.min(...[...gridState.keys()].map(i => i.entries[1]));
        let maxY = Math.max(...[...gridState.keys()].map(i => i.entries[1]));

        // Constructing the String Representation of the State
        let stateStringRepresentation = "";

        // for(let y = Math.min(maxY, 40); y >= Math.max(minY, -40); y--) {
        //     for(let x = Math.max(minX, -40); x <= Math.min(maxX, 40); x++) {
        for(let y = maxY; y >= minY; y--) {
            for(let x = minX; x <= maxX; x++) {
                stateStringRepresentation += `${(grid.getCell(new Vector([x, y]), gridState) === 1 ? "#" : " ")} `;
            }
            stateStringRepresentation += "\n"
        }

        // Logging the String Representation of the State
        console.clear();
        console.log("==========================");
        console.log(`Iteration ${iterationCount}\nBounding Box - (${minX}, ${minY}) to (${maxX}, ${maxY})`);
        console.log("==========================");
        console.log(stateStringRepresentation);

        // Updating State
        grid.evolveState();
        iterationCount ++;

        // Delaying by 1 second until the next frame
        await delay(100);
    }
})();