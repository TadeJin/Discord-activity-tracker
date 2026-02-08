"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTrackedUsers = exports.removeUser = exports.addNewUser = void 0;
const constants_1 = require("./constants");
const dataManager_1 = require("./dataManager");
const addNewUser = async (userID) => {
    try {
        return ((0, dataManager_1.createFolderIfNotExists)(constants_1.DATA_FOLDER_PATH) &&
            (0, dataManager_1.addUserToTime)(userID) &&
            (0, dataManager_1.addUserToMonth)(userID) &&
            await (0, dataManager_1.updateJoinTimeIfInChannel)(userID));
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.addNewUser = addNewUser;
const removeUser = (userID) => {
    try {
        return ((0, dataManager_1.removeUserFromJSON)(userID, constants_1.USER_TIMES_PATH) &&
            (0, dataManager_1.removeUserFromJSON)(userID, constants_1.MONTH_TIMES_PATH));
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.removeUser = removeUser;
const showTrackedUsers = () => {
    try {
        const userTimes = (0, dataManager_1.getJSONContent)(constants_1.USER_TIMES_PATH);
        let message = "Currently tracked users are:\n";
        for (const userID in userTimes) {
            message += `<@${userID}>\n`;
        }
        return message;
    }
    catch (error) {
        console.error(error);
        return "Error fetching users";
    }
};
exports.showTrackedUsers = showTrackedUsers;
