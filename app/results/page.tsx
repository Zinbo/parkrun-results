import {Achievement, Data, Participant} from "@/app/scrapeResults";


var groupBy = function (xs: any, key: any) {
    return xs.reduce(function (rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export default async function ResultsPage() {

    // const results = await fetch('http://localhost:3000/api/results', { next: { revalidate: 20 } })
    const results = await fetch('http://localhost:3000/api/results', {next: {revalidate: 20}})
    console.log("Getting data!");
    const data: Data = await results.json();
    const achievements = data.achievements;
    const raceToDetails = new Map(Object.entries(data.raceToDetails));

    const grouped = groupBy(achievements, 'type');


    function Tables() {
        const tables = [];
        // @ts-ignore
        for (const [raceName, race] of raceToDetails.entries()) {
            tables.push((
                <div style={{flex: 1}}>
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
                                <tr>
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


    // @ts-ignore
    return (
        <div>
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
                                    first in their gender category in the {achievement.race} with a time of {achievement.runTime}!</li>
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
                                    their personal best in the {achievement.race} with a time of {achievement.runTime}!</li>
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
                                return <li key={achievement.name + achievement.type}>{achievement.name} ran the {achievement.race} for the first time ever!</li>
                            })
                        }
                    </ul>
                </>)
            }
            <h1>Results</h1>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', gridAutoRows: '1fr'}}>
                <Tables/>
            </div>
        </div>
    );
}