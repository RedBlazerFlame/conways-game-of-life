import { CellularAutomatonTypes } from "../scripts/cellular-automaton.js";
import { BaseState, CompositionState } from "../scripts/state.js";
import { Vector } from "../scripts/vector.js";

// const gliderState: CellularAutomatonTypes.State = new Map(
//     [
//         [ [0, 0], 1 ],
//         [ [-1, 0], 1 ],
//         [ [0, -1], 1 ],
//         [ [0, 1], 1 ],
//         [ [1, 1], 1 ]
//     ].map((i: [Array<number>, number]) => [new Vector(i[0] as Array<number>), i[1]])
// );

// const tripleGlider = new CompositionState([new BaseState(gliderState, new Vector([0, 0])), new BaseState(gliderState, new Vector([1, 1])), new BaseState(gliderState, new Vector([1, 1]))], new Vector([0, 0]));

// console.log(tripleGlider.compile());