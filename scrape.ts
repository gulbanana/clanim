import { Datum } from "./Datum";
import fallbackData from './fallback.json';

export async function getCovidLiveWA(): Promise<Datum[]> {
    try
    {
        let response = await fetch("http://cors.thomascastiglione.com/covidlive.com.au/report/daily-source-overseas/wa");
        let text = await response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, "text/html");        
        
        let data: Datum[] = [];
        let rows = doc.querySelectorAll<HTMLTableRowElement>("table.DAILY-SOURCE-OVERSEAS > tbody > tr:not(:first-child)");
        rows.forEach(tr => {
            let date = (tr.children[0] as HTMLElement).innerText;
            let overseasText = (tr.children[3] as HTMLElement).innerText;
            let localText = (tr.children[6] as HTMLElement).innerText;
            
            let overseas = parseInt(overseasText.replace(",", ""));
            let local = parseInt(localText.replace(",", ""));

            if (new Date(date) > new Date(2021, 11, 14) && !isNaN(overseas) && !isNaN(local)) {
                data.push({date, overseas, local});
            }
        })
        

        return data.reverse();
    }
    catch (error) {
        console.error(error);
        return fallbackData.reverse();
    }
}