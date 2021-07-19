import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { readRLEFile } from "../scripts/rle-file-reader.js";

(async function main(){
    const IN_DIR = "./patterns";
    const OUT_DIR = "./patterns-json";
    let filesToProcess = (await readdir(IN_DIR)).filter(i => i.split(".").reverse()[0] === "rle").map(i => {
        let splitFileName = i.split(".");

        return splitFileName.slice(0, splitFileName.length - 1).join(".");
    });

    for(let fileName of filesToProcess) {
        console.log(`Processing ${fileName}.rle`);
        let sourceFilePath = path.join(IN_DIR, `${fileName}.rle`);
        let targetFilePath = path.join(OUT_DIR, `${fileName}.json`);

        let jsonData = await readRLEFile(sourceFilePath);
        let stringifiedData = JSON.stringify([...jsonData.entries()]);

        try {
            writeFile(targetFilePath, stringifiedData, {encoding: "utf-8"});
        } catch(e) {
            throw e;
        }
    }
})();