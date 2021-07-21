export const gameOfLifeConfig = {
    startingState: new Map([]),
    cellInspectorFunction: (oldState) => {
        let oldStateKeys = [...oldState.entries()].filter(i => i[1] === 1).map(i => i[0]);
        let oldStateKeysLength = oldStateKeys.length;
        let statesToInspect = [];
        for (let i = 0; i < oldStateKeysLength; i++) {
            let vectorCoordinates = oldStateKeys[i];
            let [coordX, coordY] = JSON.parse(vectorCoordinates);
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    let newPos = [x + coordX, y + coordY];
                    statesToInspect.push(JSON.stringify(newPos));
                }
            }
        }
        return [...new Set(statesToInspect)];
    },
    evolverFunction: (position, oldState, oldGridState, cellGetterFunction) => {
        let neighbors = -oldState;
        let [positionVectorX, positionVectorY] = JSON.parse(position);
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                let newPosition = [x + positionVectorX, y + positionVectorY];
                neighbors += cellGetterFunction(JSON.stringify(newPosition), oldGridState);
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
        var _a;
        return (_a = state.get(position)) !== null && _a !== void 0 ? _a : 0;
    }
};
