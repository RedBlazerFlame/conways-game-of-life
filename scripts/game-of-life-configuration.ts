import { CellularAutomatonTypes } from "./cellular-automaton.js";
import { Vector } from "./vector.js";

export const gameOfLifeConfig: CellularAutomatonTypes.AutomataConfiguration = {
    startingState: new Map([]),
    cellInspectorFunction: (oldState: CellularAutomatonTypes.State) => {
        let oldStateKeys = [...oldState.entries()].filter(i => i[1] === 1).map(i => i[0]);

        let statesToInspect: Array<Vector<number>> = [];

        for(let vectorCoordinates of oldStateKeys) {
            for(let y = -1; y <= 1; y++) {
                for(let x = -1; x <= 1; x++) {
                    let newVector = Vector.add(vectorCoordinates, new Vector([x, y]));

                    if(!statesToInspect.reduce((acc: boolean, cur: Vector<number>) => acc || (Vector.equal(cur, newVector)), false)) {
                        statesToInspect.push(newVector);
                    }
                }
            }
        }

        return statesToInspect;
    },
    evolverFunction: (position, oldState, oldGridState, cellGetterFunction) => {
        let neighbors = - oldState;

        for(let y = -1; y <= 1; y++) {
            for(let x = -1; x <= 1; x++) {
                let newVector = Vector.add(position, new Vector([x, y]));
                neighbors += cellGetterFunction(newVector, oldGridState);
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
        for(let entry of state.entries()) {
            if(Vector.equal(entry[0], position)) {
                return entry[1];
            }
        }

        return 0;
    }
}