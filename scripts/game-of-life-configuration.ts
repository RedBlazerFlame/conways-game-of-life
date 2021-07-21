import { CellularAutomatonTypes, String2d } from "./cellular-automaton.js";
import { Vector } from "./vector.js";

export const gameOfLifeConfig: CellularAutomatonTypes.AutomataConfiguration = {
    startingState: new Map([]),
    cellInspectorFunction: (oldState: CellularAutomatonTypes.State) => {
        let oldStateKeys = [...oldState.entries()].filter(i => i[1] === 1).map(i => i[0]);
        let oldStateKeysLength = oldStateKeys.length;

        let statesToInspect: Array<String2d> = [];

        for(let i = 0; i < oldStateKeysLength; i++) {
            let vectorCoordinates = oldStateKeys[i]
            let [coordX, coordY] = JSON.parse(vectorCoordinates)
            for(let y = -1; y <= 1; y++) {
                for(let x = -1; x <= 1; x++) {
                    let newPos = [x + coordX, y + coordY];
                    statesToInspect.push(JSON.stringify(newPos) as String2d);
                }
            }
        }

        return [...new Set(statesToInspect)];
    },
    evolverFunction: (position, oldState, oldGridState, cellGetterFunction) => {
        let neighbors = - oldState;
        let [positionVectorX, positionVectorY] = JSON.parse(position);

        for(let y = -1; y <= 1; y++) {
            for(let x = -1; x <= 1; x++) {
                let newPosition = [x + positionVectorX, y + positionVectorY];
                neighbors += cellGetterFunction(JSON.stringify(newPosition) as String2d, oldGridState);
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
        return state.get(position) ?? 0;
    }
}