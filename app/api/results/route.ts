
// can set it to once per day.
import {getAllDetails} from "@/app/scrapeResults";

export const revalidate = 0;

const results = {
    "raceToDetails": {
        "Long Eaton parkrun": {
            "name": "Long Eaton parkrun",
            "resultsLink": "https://www.parkrun.org.uk/longeaton/results/weeklyresults/?runSeqNumber=374",
            "participants": [
                {
                    "position": 58,
                    "genderPosition": 50,
                    "name": "Matthew   NEEDHAM",
                    "runTime": "00:21:29",
                    "raceName": "Long Eaton parkrun"
                }
            ],
            "shorthandName": "longeaton"
        },
        "Keswick parkrun": {
            "name": "Keswick parkrun",
            "resultsLink": "https://www.parkrun.org.uk/keswick/results/weeklyresults/?runSeqNumber=441",
            "participants": [
                {
                    "position": 101,
                    "genderPosition": 79,
                    "name": "Badboy BRADLEY",
                    "runTime": "00:25:56",
                    "raceName": "Keswick parkrun"
                }
            ],
            "shorthandName": "keswick"
        },
        "Wollaton Hall parkrun": {
            "name": "Wollaton Hall parkrun",
            "resultsLink": "ht  tps://www.parkrun.org.uk/wollatonhall/results/weeklyresults/?runSeqNumber=136",
            "participants": [
                {
                    "position": 18,
                    "genderPosition": 16,
                    "name": "Marcus LEWIS",
                    "runTime": "00:20:14",
                    "raceName": "Wollaton Hall parkrun",
                    "isPb": true
                },
                {
                    "posit  ion": 45,
                    "genderPosition": 43,
                    "name": "Guy OWEN",
                    "runTime": "00:21:55",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 158,
                    "genderPosition": 130,
                    "name": "Richard KERRY",
                    "runTime": "00:25:24",
                    "raceName": "Wollaton Hall parkrun",
                    "isPb": true
                },
                {
                    "position": 200,
                    "genderPosition": 26,
                    "name": "Sarah GRIFFIN",
                    "runTime": "00:26:14",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 212,
                    "genderPosition": 167,
                    "name": "Paul BOOTHROYD",
                    "runTime": "00:26:28",
                    "raceName": "Wollaton Hall   parkrun"
                },
                {
                    "position": 278,
                    "genderPosition": 203,
                    "name": "Robert BROWNE",
                    "runTime": "00:27:46",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 341,
                    "genderPosition": 87,
                    "name": "Nicola PHOTIOU",
                    "runTime": "00:29:48",
                    "raceName": "Wollaton  Hall parkrun"
                },
                {
                    "position": 364,
                    "genderPosition": 240,
                    "name": "Neil ROBERTS",
                    "runTime": "00:30:23",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 389,
                    "genderPosition": 115,
                    "name": "Faith RICHARDSON",
                    "runTime": "00:31:19",
                    "raceName": "  Wollaton Hall parkrun"
                },
                {
                    "position": 403,
                    "genderPosition": 123,
                    "name": "Sue BAKER",
                    "runTime": "00:31:48",
                    "raceName": "Wollaton Hall parkrun",
                    "isPb": true
                },
                {
                    "position": 428,
                    "genderPosition": 143,
                    "name": "Hannah WEBBER",
                    "runTime": "00:32:55  ",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 429,
                    "genderPosition": 254,
                    "name": "Nigel STARR",
                    "runTime": "00:32:56",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 473,
                    "genderPosition": 173,
                    "name": "Bethan DAVIES SKILTON",
                    "runTime": "00:34:48",
                    "raceName": "Wollaton Hall parkrun"
                },
                {
                    "position": 583,
                    "genderPosition": 246,
                    "name": "Lisa RULL",
                    "runTime": "00:56:23",
                    "raceName": "Wollaton Hall parkrun"
                }
            ],
            "shorthandName": "wollatonhall"
        },
        "Peel parkrun": {
            "name": "Peel par  krun",
            "resultsLink": "https://www.parkrun.org.uk/peel/results/weeklyresults/?runSeqNumber=128",
            "participants": [
                {
                    "position": 475,
                    "genderPosition": 160,
                    "name": "Sarah EVERTON",
                    "runTime": "00:33:16",
                    "raceName": "Peel parkrun",
                    "isPb": true
                }
            ],
            "shorthandName": "peel"
        }
    },
    "achievements": [
        {
            "name": "Marcus LEWIS",
            "race": "Wollaton Hall parkrun",
            "type": "pb",
            "runTime": "00:20:14"
        },
        {
            "name": "Richard KERRY",
            "race": "Wollaton Hall parkrun",
            "type": "pb",
            "runTime": "00:25:24"
        },
        {
            "name": "Sue BAKER",
            "race": "Wollaton Hall parkrun",
            "type": "pb",
            "runTime": "00:31:48"
        },
        {
            "name": "Sarah EVERTON",
            "race": "Peel parkrun",
            "type": "pb",
            "runTime": "00:33:16"
        },
        {
            "name": "Peter WATSON",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Guy OWEN",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Anna GEE",
            "race": "Long Eaton parkrun",
            "type": "milestone",
            "raceNumber": 50
        },
        {
            "name": "Yasmin BRIGGS",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Lauren BJORN",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Catherine EDEN",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Louise MARSON",
            "race": "Long Eaton parkrun",
            "type": "firstEver",
            "raceNumber": 1
        },
        {
            "name": "James ROBINSON",
            "race": "Long Eaton parkrun",
            "type": "firstEver",
            "raceNumber": 1
        },
        {
            "name": "Sharon PEEL",
            "race": "Long Eaton parkrun",
            "type": "firstEver",
            "raceNumber": 1
        },
        {
            "name": "Hannah WEBBER",
            "race": "Long Eaton parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Alistair HATSWELL",
            "race": "Long Eaton parkrun",
            "type": "firstEver",
            "raceNumber": 1
        },
        {
            "name": "Peter STARR",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Tim WRIGHT",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "race  Number": 1
        },
        {
            "name": "Richard HUSTWAYTE",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Sarah GRIFFIN",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "  Paul BOOTHROYD",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Jane MILLICHIP",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Jane HARRIS",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Faith RICHARDSON",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        },
        {
            "name": "Hannah WEBBER",
            "race": "Wollaton Hall parkrun",
            "type": "firstTimeSpecificRace",
            "raceNumber": 1
        }
    ]
};
export async function GET(request: Request) {
    console.log("Called /api/results")
    // const results = await getAllDetails();
    // console.log(JSON.stringify(results));
    return Response.json(results);
    // return Response.json({raceToDetails: {}, achievements: [{name: `${Math.random()}`, race: `${Math.random()}`, type: 'pb', runTime: `${Math.random()}`}]});
}