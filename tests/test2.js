import { BaseState, CompositionState } from "../scripts/state.js";
import { Vector } from "../scripts/vector.js";
const gliderState = new Map([
    [[0, 0], 1],
    [[-1, 0], 1],
    [[0, -1], 1],
    [[0, 1], 1],
    [[1, 1], 1]
].map((i) => [new Vector(i[0]), i[1]]));
const tripleGlider = new CompositionState([new BaseState(gliderState, new Vector([0, 0])), new BaseState(gliderState, new Vector([1, 1])), new BaseState(gliderState, new Vector([1, 1]))], new Vector([0, 0]));
console.log(tripleGlider.compile());
