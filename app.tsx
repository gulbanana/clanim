import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getCovidLiveWA } from './scrape';
import { Chart } from './Chart';
import { Datum } from './Datum';

let firstWeekData = [
    {"date": "21-Dec-21", "overseas": 1, "local": 0},
    {"date": "20-Dec-21", "overseas": 0, "local": 0},
    {"date": "19-Dec-21", "overseas": 0, "local": 0},
    {"date": "18-Dec-21", "overseas": 0, "local": 0},
    {"date": "17-Dec-21", "overseas": 0, "local": 0},
    {"date": "16-Dec-21", "overseas": 0, "local": 0},
    {"date": "15-Dec-21", "overseas": 0, "local": 0}
].reverse();

let Loader = () => {
    let [data, setData] = React.useState<Datum[]>(firstWeekData);

    React.useEffect(() => {
        async function loadSlowly() {
            let realData = await getCovidLiveWA();
            for (let i = 7; i <= realData.length; i++) {
                let partialData = realData.slice(0, i);
                setData(partialData);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }

        loadSlowly();
    }, []);

    for (let i = 6; i < data.length; i++) {
        let average = 0;
        for (let j = 0; j < 7; j++) {
            average += data[i-j].local + data[i-j].overseas;
        }
        data[i].average = Math.floor(average / 7);
    }

    return <Chart series={data} />;
}

ReactDOM.render(<Loader />, document.getElementById("app"));