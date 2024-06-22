import React from 'react'
import {BarChart} from '@mui/x-charts/BarChart'

const Component = ({channelData}) => {

    console.log(channelData)

    const series = [
        {data: [], label: 'Flagged New', stack: 'total', color: '#ba6e13' },
        {data: [], label: 'Flagged Featured', stack: 'total', color: '#3d3da5' },
        {data: [], label: 'Daily Videos', stack: 'total', color: '#1c941c' },
        //{data: [], label: 'Subscribers', stack: 'total', color: '#b00' },
    ]
    const axis = {
        data: [],
        scaleType: 'band',
        categoryGapRatio: 0.1,
        barGapRatio: 0.0,
        tickPlacement: 'middle',
        tickLabelPlacement: 'middle',
        dataKey: 'day',
        tickLabelStyle: {
            angle: -45,
            textAnchor: 'end',
            fontSize: '0.8rem',
            fill: '#ddd'
        },
        valueFormatter: (day, context) =>
            context.location === 'tick'
                ? `${day.slice(5, 10)}`
                : `${day.slice(5, 10)}`,

    }

    Object.keys(channelData).map(date => {
        axis.data.push(date)
        series[0].data.push(channelData[date].channelFlags.includes('new') ? 1 : 0)
        series[1].data.push(channelData[date].channelFlags.includes('featured') ? 1 : 0)
        series[2].data.push(channelData[date].dailyVideos)
        //series[3].data.push(channelData[date].dailySubscribers)
    })

    console.log('series', series)

    return (
        <BarChart
            series={series}
            height={150}
            xAxis={[axis]}
            margin={{top: 10, bottom: 80, left: 40, right: 10}}
            slotProps={{
                legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                    itemMarkWidth: 12,
                    itemMarkHeight: 12,
                    markGap: 6,
                    itemGap: 20,
                    labelStyle: {
                        fontSize: '0.8rem',
                        fill: '#bbb',
                    },
                },
            }}

        />
    )
}
export default Component
