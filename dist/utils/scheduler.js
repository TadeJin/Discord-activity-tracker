"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = void 0;
//Automatic statistic calling
const node_cron_1 = __importDefault(require("node-cron"));
const constants_1 = require("./constants");
const statisticsManager_1 = require("./statisticsManager");
const startScheduler = () => {
    //Every Monday midnight
    node_cron_1.default.schedule("0 0 * * 1", () => {
        (0, statisticsManager_1.showWeekStatistic)();
        (0, statisticsManager_1.addWeeklySum)();
        (0, statisticsManager_1.clearTimeValuesOfUsers)(constants_1.USER_TIMES_PATH);
    });
    //First of the month midnight
    node_cron_1.default.schedule("0 0 1 * *", () => {
        (0, statisticsManager_1.showMonthStatistic)();
        (0, statisticsManager_1.clearTimeValuesOfUsers)(constants_1.USER_TIMES_PATH);
        (0, statisticsManager_1.clearTimeValuesOfUsers)(constants_1.MONTH_TIMES_PATH);
    });
};
exports.startScheduler = startScheduler;
