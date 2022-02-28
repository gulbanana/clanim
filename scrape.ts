import { Datum } from "./Datum";
import fallbackData from './fallback.json';

export async function getCovidLiveWA(): Promise<Datum[]> {
    return new Promise(resolve => setTimeout(resolve, 1000, fallbackData.reverse()));
}