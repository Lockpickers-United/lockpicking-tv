import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {primaryTheme} from '../adminChartDefaults'
import useWindowSize from '../../util/useWindowSize'

const Component = ({channelData}) => {

    const featuredColor = channelData.featuredLine.reduce((acc, point) => acc + point.y, 0) > 0
        ? '#3d59de'
        : '#666'

    const newColor = channelData.newLine.reduce((acc, point) => acc + point.y, 0) > 0
        ? '#c34343'
        : '#666'

    const channelLineData = [
        {
            id: 'Daily Videos',
            data: channelData.videosLine
        },
        {
            id: 'Flagged New',
            data: channelData.newLine
        },
        {
            id: 'Flagged Featured',
            data: channelData.featuredLine
        }
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
                        : 150

    const chartMargin = !smallWindow
        ? {top: 10, right: 20, bottom: 80, left: 50}
        : {top: 10, right: 20, bottom: 80, left: 50}

    return !channelLineData ? null : (
        <div style={{height: chartHeight, width: '100%'}}>
            <ResponsiveLine
                theme={primaryTheme}
                data={channelLineData}
                enableGridX={false}
                enableGridY={false}
                colors={['#4fa720', newColor, featuredColor]}
                lineWidth={3}
                margin={chartMargin}
                height={chartHeight}
                curve='basis'
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat=' >-.2f'
                axisLeft={{
                    tickValues: 1,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: ','
                }}
                xScale={{
                    type: 'point',
                    format: '%m-%d'
                }}
                xFormat='time:%m/%d/%y'
                axisBottom={{
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
                isInteractive={false}
            />
        </div>
    )
}

export default Component
