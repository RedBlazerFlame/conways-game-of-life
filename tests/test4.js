var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readdir, writeFile } from "fs/promises";
import path from "path";
import { readRLEFile } from "../scripts/rle-file-reader.js";
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const IN_DIR = "./patterns";
        const OUT_DIR = "./patterns-json";
        let filesToProcess = (yield readdir(IN_DIR)).filter(i => i.split(".").reverse()[0] === "rle").map(i => {
            let splitFileName = i.split(".");
            return splitFileName.slice(0, splitFileName.length - 1).join(".");
        });
        for (let fileName of filesToProcess) {
            console.log(`Processing ${fileName}.rle`);
            let sourceFilePath = path.join(IN_DIR, `${fileName}.rle`);
            let targetFilePath = path.join(OUT_DIR, `${fileName}.json`);
            let jsonData = yield readRLEFile(sourceFilePath);
            let stringifiedData = JSON.stringify([...jsonData.entries()]);
            try {
                writeFile(targetFilePath, stringifiedData, { encoding: "utf-8" });
            }
            catch (e) {
                throw e;
            }
        }
    });
})();
