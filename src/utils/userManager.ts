import { DATA_FOLDER_PATH, MONTH_TIMES_PATH, USER_TIMES_PATH } from "./constants";
import { createFolderIfNotExists, getJSONContent, removeUserFromJSON, addUserToMonth, addUserToTime, updateJoinTimeIfInChannel } from "./dataManager";
import { userTimeJSON } from "./types";

export const addNewUser = async (userID: string): Promise<boolean> => {
    try {
        return (
            createFolderIfNotExists(DATA_FOLDER_PATH) &&
            addUserToTime(userID) &&
            addUserToMonth(userID) &&
            await updateJoinTimeIfInChannel(userID)
        );
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const removeUser = (userID: string): boolean => {
    try {
        return (
            removeUserFromJSON(userID, USER_TIMES_PATH) &&
            removeUserFromJSON(userID, MONTH_TIMES_PATH)
        );
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const showTrackedUsers = ():string => {
    try {
        const userTimes = getJSONContent(USER_TIMES_PATH) as userTimeJSON;
        let message = "Currently tracked users are:\n"

        for (const userID in userTimes) {
            message += `<@${userID}>\n`
        }

        return message
    } catch (error) {
        console.error(error)
        return "Error fetching users"
    }

}
