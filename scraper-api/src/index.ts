import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { getResult } from './apifyService';
import { scheduleJob } from 'node-schedule';
import cache from './cache';
import {start} from "repl";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const refreshCacheJob = async () => {
    try {
        console.log('Refreshing cache...');
        await cache.refreshCache();
        console.log('Cache refreshed successfully.');
    } catch (error) {
        console.error('Error refreshing cache:', error);
        throw error; // Rethrow the error to ensure server startup is blocked
    }
};

// Schedule the job to run every Sunday at midnight
scheduleJob('0 0 * * 0', refreshCacheJob);

app.get('/results', async (req: Request, res: Response) => {
    try {
        const result = cache.getResults();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Block server startup until cache is refreshed
const startServer = async () => {
    try {
        await refreshCacheJob();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with an error code
    }
};

startServer();