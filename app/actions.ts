'use server'

const API_URL = process.env.PARKRUN_API_URL;
if(!API_URL) console.error("API_URL env var not defined!")

export async function getApiUrl() {
    return API_URL;
}
