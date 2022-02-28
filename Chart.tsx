import * as React from 'react';
import {
    XYChart,
    AnimatedAxis,
    AnimatedLineSeries,
    AnimatedBarSeries,
    AnimatedBarStack,    
    Tooltip,
} from '@visx/xychart';
import * as curve from '@visx/curve';
import { Datum, localMetadata, overseasMetadata, averageMetadata } from './Datum';

interface ChartProps {
    series: Datum[];
}
  
export let Chart: React.FC<ChartProps> = ({series}) => (
    <XYChart height={800} xScale={{ type: "band", padding: 0.2 }} yScale={{ type: "linear" }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedAxis orientation="left" />
        <AnimatedBarStack>
            <AnimatedBarSeries dataKey="Acquired Locally" data={series} {...localMetadata} />
            <AnimatedBarSeries dataKey="Acquired Overseas" data={series} {...overseasMetadata} />
        </AnimatedBarStack>
        <AnimatedLineSeries curve={curve.curveBasis} strokeWidth={4}  dataKey="Weekly Average" data={series} {...averageMetadata} />
        <Tooltip<Datum>
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData, colorScale }) => (!tooltipData || !colorScale) ? "" : (
                <div>
                    <div style={{ color: colorScale(tooltipData.nearestDatum!.key) }}>
                        {tooltipData.nearestDatum!.datum.date}
                    </div>
                    {localMetadata.yAccessor(tooltipData.nearestDatum!.datum)}
                    {" local, "}
                    {overseasMetadata.yAccessor(tooltipData.nearestDatum!.datum)}
                    {" overseas"}
                </div>
            )}
        />
    </XYChart>
  );