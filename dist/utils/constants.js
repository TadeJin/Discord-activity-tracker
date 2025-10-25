"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FOLDER_PATH = exports.MONTH_TIMES_PATH = exports.USER_TIMES_PATH = void 0;
const path_1 = __importDefault(require("path"));
exports.USER_TIMES_PATH = path_1.default.join(
//Path to userTimes
__dirname, "..", "botData", "userTimes.json");
exports.MONTH_TIMES_PATH = path_1.default.join(
//Path to monthlySum
__dirname, "..", "botData", "monthlySum.json");
exports.CONFIG_FOLDER_PATH = path_1.default.join(__dirname, "..", "botData"); //Path to folder containing data JSONs
