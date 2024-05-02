'use server'
import {revalidateTag} from "next/cache";

export default async function timer() {
    console.log("In timer action!");
    setTimeout(() => {
        console.log("Revalidating!")
        revalidateTag('results');
    }, 10000);
}

export async function revalidate() {revalidateTag('results');}
