import axios from 'axios';
import * as cheerio from 'cheerio';

const CLUB_NUMBER = process.env.PARKRUN_CLUB_NUMBER;
if(!CLUB_NUMBER) throw new Error('Please set PARKRUN_CLUB_NUMBER environment variable');

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

export interface Data {
    raceToDetails: {[k: string]: Race};
    achievements: Achievement[];
}

const MILESTONES = [25, 50, 100, 250, 500, 1000];

async function getAllRaces(url: string, achievements: Achievement[]): Promise<Map<string, Race>> {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
        },
    });
    const $ = cheerio.load(response.data);
    const raceNameToDetails = new Map<string, Race>(); // map of race name to participants

    $('h2').each((index: number, element: cheerio.Element) => {
        const raceName = $(element).text().trim();
        const $table = $(element).nextUntil('h2', 'table.sortable');
        const resultsLink = $(element).nextUntil('h2', 'p').find('a').first().attr('href') || '';

        const participants: Participant[] = [];

        $table.find('tbody tr').each((index, row) => {
            const columns = $(row).find('td');
            const club = columns.eq(3).text().trim();
            if (club !== 'Erewash Valley RC') return;

            const position = parseInt(columns.eq(0).text().trim() || '0', 10);
            const genderPosition = parseInt(columns.eq(1).text().trim() || '0', 10);
            const name = columns.eq(2).text().trim();
            const runTime = columns.eq(4).text().trim();

            if(position == 1) achievements.push({
                name,
                race: raceName,
                type: 'cameFirst',
                runTime
            })
            else if (genderPosition == 1) achievements.push({
                name,
                race: raceName,
                type: 'cameFirstGender',
                runTime
            })


            participants.push({ position, genderPosition, name, runTime, raceName });
        });

        const raceNameRegex = /https:\/\/www\.parkrun\.org\.uk\/([^\/]+)\/results/;
        const match = resultsLink.match(raceNameRegex);
        if (!match || match.length === 0) throw Error(`Couldn't extract race name from link: ${resultsLink}`);
        const shorthandName = match[1];


        raceNameToDetails.set(raceName,  { name: raceName, resultsLink, participants, shorthandName})
    });

    return raceNameToDetails;
}

async function getIndividualRaceAchievements(raceToDetails: Map<string, Race>) {
    const achievements: Achievement[] = [];
    // @ts-ignore
    for (const [raceName, race] of raceToDetails.entries()) {
        const response = await axios.get(race.resultsLink, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            },
        });
        const $ = cheerio.load(response.data);
        const resultsTable = $('table').first();
        const resultsRows = resultsTable.find('tbody tr');
        resultsRows.each((index, row) => {
            const nameElement = $(row).find('.Results-table-td.Results-table-td--name').find('div.compact');
            const matchingParticipant = race.participants.find((p: Participant) => p.name === nameElement.text());
            if(!matchingParticipant) return;
            const isPb = $(row).find('.Results-table-td.Results-table-td--time.Results-table-td--pb').length > 0;
            if(isPb) achievements.push({name: matchingParticipant.name, race: raceName, type: 'pb', runTime: matchingParticipant.runTime});
        });
    }

    return achievements;
}

async function getMilestones(raceToDetails: Map<string, Race>) {
    const achievements: Achievement[] = [];
    // @ts-ignore
    for (const [raceName, race] of raceToDetails.entries()) {
        const response = await axios.get(`https://www.parkrun.org.uk/${race.shorthandName}/results/clubhistory/?clubNum=${CLUB_NUMBER}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            },
        });
        const $ = cheerio.load(response.data);
        $('table#results tbody tr').each((index, element) => {
            const name = $(element).find('td:nth-child(1) a').text().trim();
            const numberParkruns = parseInt($(element).find('td:nth-child(3)').text().trim());
            const totalParkruns = parseInt($(element).find('td:nth-child(4)').text().trim());
            if(totalParkruns == 1) achievements.push({name, race: raceName, type: 'firstEver', raceNumber: numberParkruns});
            else if(numberParkruns == 1) achievements.push({name, race: raceName, type: 'firstTimeSpecificRace', raceNumber: numberParkruns});
            else if(MILESTONES.includes(totalParkruns)) achievements.push({name, race: raceName, type: 'milestone', raceNumber: totalParkruns});
        });

    }

    return achievements;
}

const parkrunURL = `https://www.parkrun.com/results/consolidatedclub/?clubNum=${CLUB_NUMBER}`;

export async function getAllDetails(): Promise<Data> {
    const achievements: Achievement[] = [];
    let raceToDetails = await getAllRaces(parkrunURL, achievements);
    achievements.push(...(await getIndividualRaceAchievements(raceToDetails)));
    achievements.push(...(await getMilestones(raceToDetails)));
    return { raceToDetails: Object.fromEntries(raceToDetails), achievements };
}
