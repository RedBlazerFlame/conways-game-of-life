import { Vector } from "./vector.js";
export const gameOfLifeConfig = {
    startingState: new Map([]),
    cellInspectorFunction: (oldState) => {
        let oldStateKeys = [...oldState.entries()].filter(i => i[1] === 1).map(i => i[0]);
        let statesToInspect = [];
        for (let vectorCoordinates of oldStateKeys) {
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    let newVector = Vector.add(new Vector(JSON.parse(vectorCoordinates)), new Vector([x, y]));
                    statesToInspect.push(JSON.stringify(newVector.entries));
                }
            }
        }
        return [...new Set(statesToInspect)];
    },
    evolverFunction: (position, oldState, oldGridState, cellGetterFunction) => {
        let neighbors = -oldState;
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                let newVector = Vector.add(new Vector(JSON.parse(position)), new Vector([x, y]));
                neighbors += cellGetterFunction(JSON.stringify(newVector.entries), oldGridState);
            }
        }
        switch (oldState) {
            default:
            case 0:
                {
                    if (neighbors === 3) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
                break;
            case 1:
                {
                    if (neighbors === 2 || neighbors === 3) {
                        return 1;
                    }
                    else {
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
        var _a;
        return (_a = state.get(position)) !== null && _a !== void 0 ? _a : 0;
    }
};
