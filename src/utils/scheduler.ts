//Automatic statistic calling
import cron from "node-cron";
import {
    showWeekStatistic,
    addWeeklySum,
    showMonthStatistic,
    clearMonthValues,
    clearWeeklyValues,
} from "./statisticsManager";
import { addOverflows, updateAllJoinTimesIfInChannel } from "./dataManager";

export const startScheduler = (): boolean => {
    try {
        cron.schedule("0 0 * * *", () => {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const dayOfMonth = now.getDate();

            if (dayOfWeek == 1 && dayOfMonth == 1) {
                showMonthStatistic(process.env.CHANNEL_ID);
                clearWeeklyValues()
                clearMonthValues()
                updateAllJoinTimesIfInChannel()
            } else if (dayOfWeek == 1) {
                showWeekStatistic(process.env.CHANNEL_ID);
                addWeeklySum();
                clearWeeklyValues()
                updateAllJoinTimesIfInChannel()
            } else if (dayOfMonth == 1) {
                showMonthStatistic(process.env.CHANNEL_ID);
                addOverflows();
                clearMonthValues()
                updateAllJoinTimesIfInChannel()
            }
        });
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
};
