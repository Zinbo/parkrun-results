import NodeCache from 'node-cache';
import {getResult} from "./apifyService";

const cache = new NodeCache();

export default {
    refreshCache: async () => {
        const results = await getResult();
        cache.set('data', results, getNextSunday().getSeconds());
    },
    getResults: () => {
        console.log("Retrieving data from cache...");
        return cache.get('data');
    }
};

function getNextSunday(): Date {
    const today: Date = new Date();
    const day: number = today.getDay(); // Get the current day (0 for Sunday, 1 for Monday, etc.)
    const nextSunday: Date = new Date(today); // Create a new Date object with the current date
    nextSunday.setHours(0, 0, 0, 0);

    // Calculate the number of days until Sunday
    const daysUntilSunday: number = 7 - day;

    // If today is Sunday, add 7 days to get to the next Sunday
    if (day === 0) {
        nextSunday.setDate(today.getDate() + 7);
    } else {
        nextSunday.setDate(today.getDate() + daysUntilSunday);
    }

    return nextSunday;
}