import { Datum } from "./Datum";
import fallbackData from './fallback.json';

export async function getCovidLiveWA(): Promise<Datum[]> {
    return new Promise(resolve => setTimeout(resolve, 0, fallbackData.reverse()));
}