'use server'
import {Data, getAllDetails} from "@/app/scrapeResults";

let ttlDate : Date|null = null;
let cachedData : Data|null = null;
let refreshTime: Date = new Date();

const TTL = process.env.PARKRUN_TTL_IN_SECONDS;
if(TTL) console.log(`Overriding TTL to ${TTL} seconds`)
else console.log("Using default TTL of next sunday")

export interface DataWithRefreshTime {
    data: Data
    dateRefreshedAt: Date
}

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

function getTtlDate() {
    const ttlInSeconds = parseInt(TTL || '60');
    return new Date(new Date().getTime() + ttlInSeconds * 1000);
}

async function refreshData() {
    console.log("Refreshing data at " + new Date());
    cachedData = await getAllDetails();
    ttlDate = TTL ? getTtlDate() : getNextSunday();
    console.log("Data won't be refreshed until " + ttlDate);
    refreshTime = new Date();
    return {data: cachedData, dateRefreshedAt: refreshTime};
}

export async function getData(): Promise<DataWithRefreshTime> {
    if(!cachedData || !ttlDate || ttlDate < new Date()) return refreshData();

    console.log("Returning cached data at " + new Date());
    return {data: cachedData, dateRefreshedAt: refreshTime};
}
