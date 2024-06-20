import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {primaryTheme} from '../adminChartDefaults'
import useWindowSize from '../../util/useWindowSize'

const Component = ({channelData}) => {

    const viewsLine = []
    const subscribersLine = []
    const videosLine = []
    Object.keys(channelData)
        .map(date => {
            viewsLine.push({x: date, y: channelData[date].dailyViews})
            subscribersLine.push({x: date, y: channelData[date].dailySubscribers})
            videosLine.push({x: date, y: channelData[date].dailyVideos})
        })

    viewsLine.shift()
    subscribersLine.shift()
    videosLine.shift()

    const channelLineData = [
        {
            id: 'Daily Views',
            data: viewsLine
        },
        {
            id: 'Daily Subscribers',
            data: subscribersLine
        },
        {
            id: 'Daily Videos',
            data: videosLine
        },

    ]

    const {width} = useWindowSize()
    const mobileSmall = width <= 360
    const mobileMedium = width <= 395
    const mobileLarge = width <= 428  // but test also at 412
    const smallWindow = width <= 560
    const midWindow = width <= 820

    const chartHeight =
        mobileSmall ? 200
            : mobileMedium ? 200
                : mobileLarge ? 210
                    : midWindow ? 230
                        : 350

    const chartMargin = !smallWindow
        ? {top: 10, right: 20, bottom: 80, left: 50}
        : {top: 10, right: 20, bottom: 60, left: 50}

    return !channelLineData ? null : (
        <div style={{height: chartHeight, width: '100%'}}>
            <ResponsiveLine
                theme={primaryTheme}
                data={channelLineData}
                enableGridX={false}
                enableGridY={true}
                colors={['#4fa720', '#c7632b', '#3d59de']}
                lineWidth={3}
                margin={chartMargin}
                height={chartHeight}
                curve='natural'
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=' >-.2f'
                axisLeft={{
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: ','
                }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d'
                }}
                xFormat='time:%m/%d/%y'
                axisBottom={{
                    format: '%b %d',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    direction: 'row',
                    legendOffset: -12,
                    tickValues: 'every day'
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        itemTextColor: '#aaa',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemsSpacing: 30,
                        itemWidth: 100,
                        itemHeight: 20,
                        symbolSize: 13,
                        symbolShape: 'circle'
                    }
                ]}
                enablePoints={false}
                useMesh={true}
                isInteractive={true}
            />
        </div>
    )
}

export default Component
