var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFile } from "fs/promises";
export function readRLEText(rawText) {
    let [header, ...data] = [...rawText.matchAll(/[^\r]/g)].reduce((acc, cur) => acc + cur, "").split("\n").filter(i => (!(i.startsWith("#") || i.startsWith(" "))));
    let processedData1 = data.reduce((acc, cur) => acc + cur, "").split("$");
    let headerJSON = JSON.parse(`{${header.replaceAll(" = ", ":").replace("x", "\"x\"").replace("y", "\"y\"").split(",").slice(0, 2)}}`);
    let processedData2 = [];
    let firstLettersPerRow = [];
    let index = 0;
    for (let row of processedData1) {
        let firstLetter = row.match(/[o|b]/g)[0];
        firstLettersPerRow.push(firstLetter);
        let processedRow1 = row.split(/[o|b|!]/g);
        if (index === processedData1.length - 1) {
            processedData2.push(processedRow1.slice(0, processedRow1.length - 2).map(i => (i === "" ? 1 : +i)));
        }
        else {
            processedData2.push(processedRow1.slice(0, processedRow1.length - 1).map(i => (i === "" ? 1 : +i)));
        }
        index++;
    }
    let result = new Map([]);
    let x = 0;
    let y = headerJSON.y - 1;
    processedData2.forEach((row, rowIndex) => {
        y = headerJSON.y - 1 - rowIndex;
        let state = firstLettersPerRow[rowIndex];
        x = 0;
        row.forEach((occurrences) => {
            if (state === "o") {
                for (let xOffset = 0; xOffset < occurrences; xOffset++) {
                    result.set(`[${x + xOffset},${y}]`, 1);
                }
            }
            x += occurrences;
            state = (state === "b" ? "o" : "b");
        });
    });
    return result;
}
export function readRLEFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return readRLEText(yield readFile(path, { encoding: "utf-8" }));
    });
}
