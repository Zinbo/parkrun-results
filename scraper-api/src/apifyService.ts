import {ApifyClient} from 'apify-client';

const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
});

export interface DataWithRefreshTime {
    data: Data
    dateRefreshedAt: Date
}

export interface Participant {
    position: number;
    genderPosition: number;
    name: string;
    runTime: string;
    raceName: string;
}

interface Race {
    name: string;
    shorthandName: string;
    resultsLink: string;
    participants: Participant[];
}

export interface Achievement {
    name: string,
    race: string,
    type: 'pb' | 'ft' | 'milestone' | 'firstEver' | 'firstTimeSpecificRace' | 'cameFirstGender' | 'cameFirst',
    runTime ?: string,
    raceNumber ?: number
}

export interface RaceToDetails {
    [key: string]: Race
}

export interface Data {
    raceToDetails: RaceToDetails;
    achievements: Achievement[];
    milestones: Achievement[];
}

export const getResult = async () => {
    console.log("Calling Apify...")

    const run = await client.task("G2kFcBcHQLmIIOv6H").call();

    // Fetch and print Actor task results from the run's dataset (if any)
    let achievements: Achievement[] = [];
    let milestones: Achievement[] = [];
    let raceToDetails: RaceToDetails = {};
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item: any) => {
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

    console.log("Data from Apify: ", JSON.stringify(data, null, 2));

    console.log("Finished getting data from Apify.");

    return {data, dateRefreshedAt: new Date()};
};