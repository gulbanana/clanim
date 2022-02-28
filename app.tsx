import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Axis,
    Grid,
    LineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';

type Datum = {x: string, y: number};

let data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
];

let data2 = [
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 },
];

let accessors = {
    xAccessor: (d: Datum) => d.x,
    yAccessor: (d: Datum) => d.y,
};

let Chart = () => (
    <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
      <Axis orientation="bottom" />
      <Grid columns={false} numTicks={4} />
      <LineSeries dataKey="Line 1" data={data1} {...accessors} />
      <LineSeries dataKey="Line 2" data={data2} {...accessors} />
      <Tooltip<Datum>
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (!tooltipData || !colorScale) ? "" : (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum!.key) }}>
              {tooltipData.nearestDatum!.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum!.datum)}
            {', '}
            {accessors.yAccessor(tooltipData.nearestDatum!.datum)}
          </div>
        )}
      />
    </XYChart>
  );

ReactDOM.render(<Chart/>, document.body);