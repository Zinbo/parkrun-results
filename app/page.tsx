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

    const [results, setResults] = React.useState<DataWithRefreshTime | null>(null);

    useEffect(() => {
        async function fetchData() {
            const url = await getApiUrl();
            const response = await fetch(`${url}/results`);
            const data: DataWithRefreshTime = await response.json();
            setResults(data);
        }

        fetchData();
    }, []);
    if (!results) return <div className="loader"></div>;
    const achievements = results.data.achievements;
    const milestones = results.data.milestones;
    const raceToDetails = new Map(Object.entries(results.data.raceToDetails));

    const groupedAchievements = groupBy(achievements, 'type');
    const groupedMilestones = groupBy(milestones, 'type');


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

    function AchievementsList({achievements, title, achievementLine}: {
        achievements: Achievement[],
        title: string,
        achievementLine: (achievement: Achievement) => string
    }) {
        if (!achievements) return <></>
        return (
            <>
                <h2>{title}</h2>
                <ul>
                    {achievements.map((achievement: Achievement) => <li
                        key={achievement.name + achievement.type}>{achievementLine(achievement)}</li>)}
                </ul>
            </>
        )
    }

    return <div>
        <h1>Data Last Refreshed At: {new Date(results.dateRefreshedAt).toISOString()}</h1>
        <h1>Achievements</h1>
        <AchievementsList achievements={groupedAchievements['cameFirst']} title={"Came First"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} came
                        first in the ${achievement.race} with a time of ${achievement.runTime}`}/>
        <AchievementsList achievements={groupedAchievements['cameFirstGender']} title={"Came First Gender"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} came
                                first in their gender category in the ${achievement.race} with a time
                                of ${achievement.runTime}!`}/>
        <AchievementsList achievements={groupedAchievements['pb']} title={"Personal Best"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} set
                                their personal best in the ${achievement.race} with a time
                                of ${achievement.runTime}!`}/>
        <AchievementsList achievements={groupedMilestones['milestone']} title={"Milestones"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} has reached
                                the ${achievement.raceNumber} total parkruns milestone!`}/>
        <AchievementsList achievements={groupedMilestones['firstEver']} title={"First Ever"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} ran their
                                first ever parkrun!`}/>
        <AchievementsList achievements={groupedMilestones['firstTimeSpecificRace']} title={"First Time For Race"}
                          achievementLine={(achievement: Achievement) => `${achievement.name} ran
                                the ${achievement.race} for the first time ever!`}/>
        <h1>Results</h1>
        <div className={"grid-container"}>
            <Tables/>
        </div>
    </div>;
}