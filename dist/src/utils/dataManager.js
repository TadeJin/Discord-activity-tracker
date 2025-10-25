"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readData = void 0;
const botConfig_json_1 = __importDefault(require("../../botConfig/botConfig.json"));
const readData = () => {
    Object.entries(botConfig_json_1.default).forEach(([key, value]) => {
        console.log(`User key: ${key}, ID: ${value.id}`);
    });
};
exports.readData = readData;
