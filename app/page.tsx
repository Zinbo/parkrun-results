'use client'
import {Achievement, Data, Participant} from "@/app/scrapeResults";
import {getApiUrl} from "@/app/actions";
import React, {useEffect} from "react";

const groupBy = function (xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export interface DataWithRefreshTime {
    data: Data
    dateRefreshedAt: Date
}

export default function ResultsPage() {

    const [results, setResults] = React.useState<DataWithRefreshTime|null>(null);

    useEffect(() => {
        async function fetchData() {
            const url = await getApiUrl();
            const response = await fetch(`${url}/results`);
            const data : DataWithRefreshTime = await response.json();
            setResults(data);
        }
        fetchData();
    }, []);
    if(!results) return <div className="loader"></div>;
    const achievements = results.data.achievements;
    const raceToDetails = new Map(Object.entries(results.data.raceToDetails));

    const grouped = groupBy(achievements, 'type');



    function Tables() {
        const tables = [];
        // @ts-ignore
        for (const [raceName, race] of raceToDetails.entries()) {
            tables.push((
                <div style={{flex: 1}} key={raceName}>
                    <h2>{raceName}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Participant</th>
                            <th>Position</th>
                            <th>Gender Position</th>
                            <th>Run Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {race.participants.map((participant: Participant) => {
                            return (
                                <tr key={participant.name}>
                                    <td>{participant.name}</td>
                                    <td>{participant.position}</td>
                                    <td>{participant.genderPosition}</td>
                                    <td>{participant.runTime}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            ));
        }

        return tables;
    }

    return <div>
        <h1>Data Last Refreshed At: {new Date(results.dateRefreshedAt).toISOString()}</h1>
        <h1>Achievements</h1>
        {
            (grouped['firstEver']?.length) &&
            (<>
                <h2>First Ever</h2>
                <ul>
                    {
                        grouped['firstEver'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} ran their
                                first ever parkrun!</li>
                        })
                    }
                </ul>
            </>)
        }
        {
            (grouped['cameFirst']?.length) &&
            (<>
                <h2>Came First</h2>
                <ul>
                    {
                        grouped['cameFirst'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} came
                                first in the {achievement.race} with a time of {achievement.runTime}!</li>
                        })
                    }
                </ul>
            </>)
        }

        {
            (grouped['cameFirstGender']?.length) &&
            (<>
                <h2>Came First Gender</h2>
                <ul>
                    {
                        grouped['cameFirstGender'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} came
                                first in their gender category in the {achievement.race} with a time
                                of {achievement.runTime}!</li>
                        })
                    }
                </ul>
            </>)
        }
        {
            (grouped['milestone']?.length) &&
            (<>
                <h2>Milestones</h2>
                <ul>
                    {
                        grouped['milestone'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} has reached
                                the {achievement.raceNumber} total parkruns milestone!</li>
                        })
                    }
                </ul>
            </>)
        }
        {
            (grouped['pb']?.length) &&
            (<>
                <h2>Personal Best</h2>
                <ul>
                    {
                        grouped['pb'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} set
                                their personal best in the {achievement.race} with a time
                                of {achievement.runTime}!</li>
                        })
                    }
                </ul>
            </>)
        }
        {
            (grouped['firstTimeSpecificRace']?.length) &&
            (<>
                <h2>First Time Specific Race</h2>
                <ul>
                    {
                        grouped['firstTimeSpecificRace'].map((achievement: Achievement) => {
                            return <li key={achievement.name + achievement.type}>{achievement.name} ran
                                the {achievement.race} for the first time ever!</li>
                        })
                    }
                </ul>
            </>)
        }
        <h1>Results</h1>
        <div className={"grid-container"}>
            <Tables/>
        </div>
    </div>;
}