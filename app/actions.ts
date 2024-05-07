'use server'
import {Achievement, Data, RaceToDetails} from "@/app/scrapeResults";
import {ApifyClient} from 'apify-client';

let ttlDate : Date|null = null;
let cachedData : Data|null = null;
let refreshTime: Date = new Date();

const TTL = process.env.PARKRUN_TTL_IN_SECONDS;
const APIFY_TOKEN = process.env.PARKRUN_APIFY_TOKEN;
if(!APIFY_TOKEN) console.error("APIFY_TOKEN env var not defined!")
if(TTL) console.log(`Overriding TTL to ${TTL} seconds`)
else console.log("Using default TTL of next sunday")

const client = new ApifyClient({
    token: APIFY_TOKEN,
});

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
    cachedData = await getDataFromApify();
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


export async function getDataFromApify(): Promise<Data> {
    // Run the Actor task and wait for it to finish
    console.log("Getting data from Apify...");
    const run = await client.task("G2kFcBcHQLmIIOv6H").call();

    // Fetch and print Actor task results from the run's dataset (if any)
    console.log('Results from dataset');
    let achievements: Achievement[] = [];
    let milestones: Achievement[] = [];
    let raceToDetails: RaceToDetails = {};
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        if(item.achievements) { // @ts-ignore
            achievements = item.achievements;
        }
        if(item.milestones) { // @ts-ignore
            milestones = item.milestones;
        }
        if(item.raceToDetails) { // @ts-ignore
            raceToDetails = item.raceToDetails;
        }
    });

    const data = {achievements, milestones, raceToDetails};

    console.log("Data from Apify: ", JSON.stringify(cachedData, null, 2));

    console.log("Finished getting data from Apify.");

    return data;
}
