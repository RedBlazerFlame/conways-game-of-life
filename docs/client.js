var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { CellularAutomaton } from "../scripts/cellular-automaton.js";
import { gameOfLifeConfig } from "../scripts/game-of-life-configuration.js";
import { State } from "../scripts/state.js";
import { transform2dMap } from "../scripts/transforms.js";
// Testing to see if JavaScript is working
console.log("%c 🌈JavaScript is Working!", "font-family: arial; background-color: white; color: black; border-radius: 5px; padding: 10px; font-size: 20px;");
// Declaring Variables and Constants
const CONFIG = Object.freeze({
    patternName: "gosperglidergun"
});
const STATE = (_b = JSON.parse((_a = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("state")) !== null && _a !== void 0 ? _a : "null")) !== null && _b !== void 0 ? _b : {
    scale: 5,
    translateX: 0,
    translateY: 0,
    minVisibleX: 0,
    minVisibleY: 0,
    maxVisibleX: 0,
    maxVisibleY: 0,
    mouseX: 0,
    mouseY: 0,
    iterationCount: 0,
    delayPerFrame: 0.1,
    paused: false,
    keyIsPressed: {
        KeyZ: false,
        KeyC: false,
        KeyW: false,
        KeyA: false,
        KeyS: false,
        KeyD: false,
        KeyQ: false,
        KeyE: false
    },
    gridState: new Map([])
};
STATE.gridState = new Map([]);
STATE.iterationCount = 0;
const IMPORTANT_KEYS = Object.keys(STATE.keyIsPressed);
// Getting a Reference to HTML elements
const bodyElement = document.querySelector("body");
// Setting up Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
bodyElement.appendChild(canvas);
// Declaring Functions
/// Delay Function
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let promiseInterval = setInterval(() => {
                if (!STATE.paused) {
                    clearInterval(promiseInterval);
                    setTimeout(() => {
                        resolve();
                    }, ms);
                }
            }, 1);
        });
    });
}
/// Canvas Set-up
function setupCanvas(ctx) {
    return Promise.resolve().then(_ => {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //ctx.setTransform(STATE.scale, 0, 0, - STATE.scale, ctx.canvas.width / 2 + STATE.translateX, ctx.canvas.height / 2 + STATE.translateY);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(STATE.scale, -STATE.scale);
        ctx.translate(-STATE.translateX, -STATE.translateY);
        draw(ctx);
        return;
    });
}
setupCanvas(ctx);
/// Clearing Screen
function clearScreen(ctx, fade = false) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (fade) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    else {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    ctx.restore();
}
/// Coloring in the Cursor
function colorCursorAndText(ctx, mouseX, mouseY) {
    // Calculating Mouse Coordinates
    let mouseCellX = Math.floor((STATE.mouseX - ctx.canvas.width / 2) / STATE.scale + STATE.translateX);
    let mouseCellY = Math.floor(-(STATE.mouseY - ctx.canvas.height / 2) / STATE.scale + STATE.translateY);
    // Writing Text
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.font = "24px arial";
    ctx.fillText(`Generation ${STATE.iterationCount}`, 0, 24);
    ctx.fillText(`MousePos - [${mouseCellX}, ${mouseCellY}]`, 0, 48);
    ctx.restore();
    // Coloring in Cursor square
    ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.rect(mouseCellX, mouseCellY, 1, 1);
    ctx.closePath();
    ctx.fill();
}
/// Canvas Draw
function draw(ctx) {
    return Promise.resolve().then(_ => {
        let gridState = [...STATE.gridState.entries()];
        let gridStateLength = gridState.length;
        // Clearing Screen
        clearScreen(ctx, false);
        // Drawing Cells
        ctx.fillStyle = "white";
        for (let i = 0; i < gridStateLength; i++) {
            let [stringCoords, state] = gridState[i];
            if (state === 1) {
                let coords = JSON.parse(stringCoords);
                if (coords[0] >= STATE.minVisibleX - 1 && coords[0] <= STATE.maxVisibleX && coords[1] >= STATE.minVisibleY - 1 && coords[1] <= STATE.maxVisibleY) {
                    ctx.beginPath();
                    ctx.rect(coords[0], coords[1], 1, 1);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
        // Bounding Boxes for rendering
        // ctx.strokeStyle = "white";
        // ctx.beginPath();
        // ctx.moveTo(STATE.minVisibleX, STATE.maxVisibleY);
        // ctx.lineTo(STATE.maxVisibleX, STATE.maxVisibleY);
        // ctx.lineTo(STATE.maxVisibleX, STATE.minVisibleY);
        // ctx.lineTo(STATE.minVisibleX, STATE.minVisibleY);
        // ctx.lineTo(STATE.minVisibleX, STATE.maxVisibleY);
        // ctx.closePath();
        // ctx.stroke();
        // Coloring In Cursor Coordinates and writing text
        colorCursorAndText(ctx, STATE.mouseX, STATE.mouseY);
        return;
    });
}
/// Fetches Pattern Files
function pattern(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Map(yield fetch(`/patterns-json/${fileName}.json`).then(res => res.json()));
    });
}
// Running Asynchronous code inside an async function
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Getting Game of Life Configuration
        const config = gameOfLifeConfig;
        // Creating State
        /// A function that evolves a state
        function evolveState(state, generations = 1) {
            let tempGrid = new CellularAutomaton(state, config.cellInspectorFunction, config.evolverFunction, config.cellGetterFunction);
            for (let i = 0; i < generations; i++) {
                tempGrid.evolveState();
            }
            return tempGrid.state;
        }
        /// Gosper Glider Gun
        const gosperGliderGun = yield pattern("gosperglidergun");
        /// Pentadecathlon
        const pentadecathlon = yield pattern("pentadecathlon");
        /// Buckaroo
        const buckaroo = yield pattern("buckaroo");
        /// Glider Eater
        const gliderEater = yield pattern("eater1");
        /// Gosper Glider Gun and Eater
        function gunEaterCombo(distance = 0) {
            return [
                State.base(gosperGliderGun, [0, 0]),
                State.base(gliderEater, [32 + distance, -6 - distance])
            ];
        }
        /// Not Gate
        function notGate(translation = [0, 0], gliderGunEvolveAmount = 5, ...transforms) {
            return State.base(State.compile([
                State.base(transforms.reduce((acc, cur) => cur(acc), evolveState(gosperGliderGun, gliderGunEvolveAmount)), [0, 0])
            ]), [translation[0] + 13, translation[1] + 27]);
        }
        /// And Gate
        function andGate(translation = [0, 0], gliderGunEvolveAmount = 0, eaterDistance = 0, ...transforms) {
            return State.base(transforms.reduce((acc, cur) => cur(acc), State.compile([
                State.base(evolveState(gosperGliderGun, gliderGunEvolveAmount), [0, 0]),
                State.base(gliderEater, [23 + eaterDistance, -4 - eaterDistance])
            ])), [translation[0], translation[1]]);
        }
        /// Or Gate
        function orGate(translation = [0, 0], gliderGunEvolveAmount = 0, secondGliderDistance = 0, secondGliderGunEvolveAmount = 0, ...transforms) {
            return State.base(transforms.reduce((acc, cur) => cur(acc), State.compile([
                State.base(evolveState(gosperGliderGun, gliderGunEvolveAmount), [0, 0]),
                State.base(evolveState(transform2dMap.flipX(gosperGliderGun), secondGliderGunEvolveAmount), [23 + secondGliderDistance + 36 - 30, -4 - secondGliderDistance - 36 + 34]),
                State.base(transform2dMap.flipX(gliderEater), [23 + secondGliderDistance + 36 - 30 - 31, -4 - secondGliderDistance - 36 + 34])
            ])), [translation[0], translation[1]]);
        }
        /// LWSS Generator
        let lwssGenerator = State.compile([
            State.base(transform2dMap.flipX(evolveState(gosperGliderGun, 0)), [30, 46]),
            State.base(transform2dMap.flipX(transform2dMap.flipY(evolveState(gosperGliderGun, 5))), [32, 24]),
            State.base(transform2dMap.flipX(evolveState(gosperGliderGun, 10)), [-12, 33]),
            State.base(transform2dMap.flipX(gliderEater), [-23, 9]),
            State.base(transform2dMap.flipX(transform2dMap.flipY(evolveState(gosperGliderGun, 2))), [-10, -51]),
            State.base(evolveState(gosperGliderGun, 5), [-69, 47]),
            State.base(transform2dMap.flipY(gosperGliderGun), [-66, -53])
        ], [0, 0]);
        /// Final State
        // const finalState = State.composition([
        //     State.base(
        //         gosperGliderGun,
        //         [0, 0]
        //     ),
        //     State.base(
        //         gosperGliderGun,
        //         [38, 0]
        //     ),
        //     //andGate([46, -24], 5, transform2dMap.flipX)
        //     orGate([10, -56], 0, 36, 6, transform2dMap.flipX),
        //     State.base(
        //         transform2dMap.rotate90cc(
        //             evolveState(
        //                 buckaroo,
        //                 30
        //             )
        //         )
        //         ,
        //         [41, -85]
        //     )
        // ])
        const finalState = State.composition([
            ...Array(5)
        ].map((_, index) => State.base(transform2dMap.flipY(lwssGenerator), [0, 111 * index])));
        // Compiling State
        const compiledStartingState = finalState.compile();
        // Setting up Config
        config.startingState = compiledStartingState;
        const grid = new CellularAutomaton(compiledStartingState, config.cellInspectorFunction, config.evolverFunction, config.cellGetterFunction);
        // Beginning Draw Loop
        function loop() {
            return __awaiter(this, void 0, void 0, function* () {
                STATE.gridState = grid.state;
                STATE.iterationCount++;
                grid.evolveState();
                draw(ctx);
                yield delay(STATE.delayPerFrame);
                requestAnimationFrame(loop);
            });
        }
        loop();
    });
})();
// Adding Event Listeners
window.addEventListener("resize", () => {
    setupCanvas(ctx);
});
window.addEventListener("mousemove", (ev) => {
    STATE.mouseX = ev.x;
    STATE.mouseY = ev.y;
    draw(ctx);
});
window.addEventListener("keydown", (ev) => {
    let keyPressed = ev.code;
    switch (keyPressed) {
        case "Space":
            STATE.paused = (STATE.paused ? false : true);
            break;
        default:
            if (IMPORTANT_KEYS.includes(keyPressed))
                STATE.keyIsPressed[ev.code] = true;
            break;
    }
});
window.addEventListener("keyup", (ev) => {
    let keyPressed = ev.code;
    if (IMPORTANT_KEYS.includes(keyPressed))
        STATE.keyIsPressed[ev.code] = false;
});
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    let redrawCanvas = false;
    // Zoom In
    if (STATE.keyIsPressed.KeyZ) {
        STATE.scale *= 1.05;
        redrawCanvas = true;
    }
    // Zoom Out
    if (STATE.keyIsPressed.KeyC) {
        STATE.scale /= 1.05;
        redrawCanvas = true;
    }
    // Up
    if (STATE.keyIsPressed.KeyW) {
        STATE.translateY += 4 / STATE.scale;
        redrawCanvas = true;
    }
    // Left
    if (STATE.keyIsPressed.KeyA) {
        STATE.translateX -= 4 / STATE.scale;
        redrawCanvas = true;
    }
    // Down
    if (STATE.keyIsPressed.KeyS) {
        STATE.translateY -= 4 / STATE.scale;
        redrawCanvas = true;
    }
    // Right
    if (STATE.keyIsPressed.KeyD) {
        STATE.translateX += 4 / STATE.scale;
        redrawCanvas = true;
    }
    // Slow Down
    if (STATE.keyIsPressed.KeyQ) {
        STATE.delayPerFrame *= (STATE.delayPerFrame > 1000 ? 1 : 1.05);
    }
    // Speed Up
    if (STATE.keyIsPressed.KeyE) {
        STATE.delayPerFrame /= (STATE.delayPerFrame < 0.5 ? 1 : 1.05);
    }
    // Redrawing the Canvas
    if (redrawCanvas)
        setupCanvas(ctx);
    // Updating Rendering Bounds
    STATE.minVisibleX = STATE.translateX - ctx.canvas.width / (STATE.scale * 2);
    STATE.minVisibleY = STATE.translateY - ctx.canvas.height / (STATE.scale * 2);
    STATE.maxVisibleX = STATE.translateX + ctx.canvas.width / (STATE.scale * 2);
    STATE.maxVisibleY = STATE.translateY + ctx.canvas.height / (STATE.scale * 2);
    localStorage.setItem("state", JSON.stringify(STATE));
}), 1);
