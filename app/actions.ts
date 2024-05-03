'use server'
import {Data, getAllDetails} from "@/app/scrapeResults";

let nextSunday : Date|null = null;
let cachedData : Data|null = null;
let refreshTime: Date = new Date();

interface DataWithRefreshTime {
    data: Data
    dateRefreshedAt: Date
}

function getNextSunday(): Date {
    const today: Date = new Date();
    const day: number = today.getDay(); // Get the current day (0 for Sunday, 1 for Monday, etc.)
    const nextSunday: Date = new Date(today); // Create a new Date object with the current date

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

function oneMinuteIntoFuture() {
    return new Date(new Date().getTime() + 60 * 1000);
}

async function refreshData() {
    console.log("Refreshing data");
    cachedData = await getAllDetails();
    nextSunday = oneMinuteIntoFuture();
    refreshTime = new Date();
    return {data: cachedData, dateRefreshedAt: refreshTime};
}

export async function getData() {
    if(!cachedData || !nextSunday || nextSunday < new Date()) return refreshData();

    console.log("Getting cached data")
    return {data: cachedData, dateRefreshedAt: refreshTime};
}
