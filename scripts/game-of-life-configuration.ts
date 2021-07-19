import { CellularAutomatonTypes, String2d } from "./cellular-automaton.js";
import { Vector } from "./vector.js";

export const gameOfLifeConfig: CellularAutomatonTypes.AutomataConfiguration = {
    startingState: new Map([]),
    cellInspectorFunction: (oldState: CellularAutomatonTypes.State) => {
        let oldStateKeys = [...oldState.entries()].filter(i => i[1] === 1).map(i => i[0]);

        let statesToInspect: Array<String2d> = [];

        for(let vectorCoordinates of oldStateKeys) {
            for(let y = -1; y <= 1; y++) {
                for(let x = -1; x <= 1; x++) {
                    let newVector = Vector.add(new Vector(JSON.parse(vectorCoordinates)), new Vector([x, y]));
                    statesToInspect.push(JSON.stringify(newVector.entries) as String2d);
                }
            }
        }

        return [...new Set(statesToInspect)];
    },
    evolverFunction: (position, oldState, oldGridState, cellGetterFunction) => {
        let neighbors = - oldState;

        for(let y = -1; y <= 1; y++) {
            for(let x = -1; x <= 1; x++) {
                let newVector = Vector.add(new Vector(JSON.parse(position)), new Vector([x, y]));
                neighbors += cellGetterFunction(JSON.stringify(newVector.entries) as String2d, oldGridState);
            }
        }

        switch(oldState) {
            default:
            case 0:
                {
                    if(neighbors === 3) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                break;
            case 1:
                {
                    if(neighbors === 2 || neighbors === 3) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

        }
    },
    cellGetterFunction: (position, state) => {
        // for(let entry of state.entries()) {
        //     if(Vector.equal(entry[0], position)) {
        //         return entry[1];
        //     }
        // }

        return state.get(position) ?? 0;
    }
}