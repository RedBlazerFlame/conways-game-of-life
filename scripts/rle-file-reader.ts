import { readFile } from "fs/promises";
import { CellularAutomatonTypes } from "./cellular-automaton.js";

export function readRLEText(rawText){
    let [header, ...data] = [...rawText.matchAll(/[^\r]/g)].reduce((acc, cur) => acc + cur, "").split("\n").filter(i => (! (i.startsWith("#") || i.startsWith(" "))) );

    let processedData1 = data.reduce((acc, cur) => acc + cur, "").split("$");
    
    let headerJSON = JSON.parse(`{${header.replaceAll(" = ", ":").replace("x", "\"x\"").replace("y", "\"y\"").split(",").slice(0, 2)}}`);

    let processedData2: Array<Array<number>> = [];
    let firstLettersPerRow: Array<string> = []

    let index = 0;
    for(let row of processedData1) {
        let firstLetter = row.match(/[o|b]/g)[0];

        firstLettersPerRow.push(firstLetter);
        
        let processedRow1 = row.split(/[o|b|!]/g);

        if(index === processedData1.length - 1) {
            processedData2.push(processedRow1.slice(0, processedRow1.length - 2).map(i => (i === "" ? 1 : +i)))
        } else {
            processedData2.push(processedRow1.slice(0, processedRow1.length - 1).map(i => (i === "" ? 1 : +i)))
        }

        index++;
    }

    let result: CellularAutomatonTypes.State = new Map([]);

    let x: number = 0;
    let y: number = headerJSON.y - 1;

    processedData2.forEach((row, rowIndex) => {
        y = headerJSON.y - 1 - rowIndex;
        let state = firstLettersPerRow[rowIndex];
        x = 0;
        row.forEach((occurrences) => {
            if(state === "o") {
                for(let xOffset = 0; xOffset < occurrences; xOffset++) {
                    result.set(`[${x + xOffset},${y}]`, 1);
                }
            }
            x += occurrences;

            state = (state === "b" ? "o" : "b");
        })
    });

    return result;
}

export async function readRLEFile(path) {
    return readRLEText(await readFile(path, {encoding: "utf-8"}));
}