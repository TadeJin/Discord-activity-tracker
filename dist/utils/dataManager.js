"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.addNewUser = exports.addUserTime = exports.addJoinTime = exports.createFileIfNotExists = exports.createFolderIfNotExists = exports.getJSONContent = void 0;
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
const getJSONContent = (filePath) => {
    try {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8").trim();
        return fileContent ? JSON.parse(fileContent) : {};
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.getJSONContent = getJSONContent;
const createFolderIfNotExists = (folderPath) => {
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
};
exports.createFolderIfNotExists = createFolderIfNotExists;
const createFileIfNotExists = (filePath) => {
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.writeFileSync(filePath, JSON.stringify({}), "utf-8");
    }
};
exports.createFileIfNotExists = createFileIfNotExists;
//Tracking call time
const addJoinTime = (userID, time) => {
    const userTimes = (0, exports.getJSONContent)(constants_1.USER_TIMES_PATH);
    userTimes[userID] = {
        time: userTimes[userID].time,
        join_time: time,
    };
    fs_1.default.writeFileSync(constants_1.USER_TIMES_PATH, JSON.stringify(userTimes), "utf-8");
};
exports.addJoinTime = addJoinTime;
const addUserTime = (userID, timeLeft) => {
    try {
        const userTimes = (0, exports.getJSONContent)(constants_1.USER_TIMES_PATH);
        if (userTimes[userID].join_time == "") {
            return false;
        }
        const joinTime = new Date(userTimes[userID].join_time).getTime();
        const leaveTime = timeLeft.getTime();
        userTimes[userID] = {
            time: (Number(userTimes[userID].time) +
                Math.floor((leaveTime - joinTime) / 1000)).toString(),
            join_time: "",
        };
        fs_1.default.writeFileSync(constants_1.USER_TIMES_PATH, JSON.stringify(userTimes), "utf-8");
    }
    catch (error) {
        console.log(error);
        return false;
    }
    return true;
};
exports.addUserTime = addUserTime;
//NEW USER
const addNewUser = (userID) => {
    try {
        (0, exports.createFolderIfNotExists)(constants_1.CONFIG_FOLDER_PATH);
        addUserToTime(userID);
        addUserToMonth(userID);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.addNewUser = addNewUser;
const addUserToMonth = (userID) => {
    try {
        (0, exports.createFileIfNotExists)(constants_1.MONTH_TIMES_PATH);
        const monthTimes = (0, exports.getJSONContent)(constants_1.MONTH_TIMES_PATH);
        monthTimes[userID] = { time: "0" };
        fs_1.default.writeFileSync(constants_1.MONTH_TIMES_PATH, JSON.stringify(monthTimes), "utf-8");
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
const addUserToTime = (userID) => {
    try {
        (0, exports.createFileIfNotExists)(constants_1.USER_TIMES_PATH);
        const userTimes = (0, exports.getJSONContent)(constants_1.USER_TIMES_PATH);
        userTimes[userID] = { time: "0", join_time: "" };
        fs_1.default.writeFileSync(constants_1.USER_TIMES_PATH, JSON.stringify(userTimes), "utf-8");
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
//REMOVING USER
const removeUser = (userID) => {
    try {
        removeUserFromJSON(userID, constants_1.USER_TIMES_PATH);
        removeUserFromJSON(userID, constants_1.MONTH_TIMES_PATH);
    }
    catch (error) {
        console.log(error);
        return false;
    }
    return true;
};
exports.removeUser = removeUser;
const removeUserFromJSON = (userID, filepath) => {
    const userTimes = (0, exports.getJSONContent)(filepath);
    if (!userTimes[userID])
        return false;
    delete userTimes[userID];
    fs_1.default.writeFileSync(filepath, JSON.stringify(userTimes), "utf-8");
};
