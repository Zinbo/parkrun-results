import {revalidate} from "@/app/results/actions";

export default function RevalidateButton() {
    return <button onClick={revalidate}>Revalidate</button>
}