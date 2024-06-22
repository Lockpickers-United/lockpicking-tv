import React from 'react'
import {ResponsiveBar} from '@nivo/bar'
import {primaryTheme} from '../adminChartDefaults'
import useWindowSize from '../../util/useWindowSize'

const Component = ({channelData}) => {

    const barData = Object.keys(channelData).map(date => {
        return {
            date: date,
            videos: channelData[date].dailyVideos,
            new: channelData[date].channelFlags.includes('new') ? 1 : 0,
            featured: channelData[date].channelFlags.includes('featured') ? 1 : 0
        }
    })

    const {width} = useWindowSize()
    const mobileSmall = width <= 360
    const mobileMedium = width <= 395
    const mobileLarge = width <= 428  // but test also at 412
    const midWindow = width <= 820

    const chartHeight =
        mobileSmall ? 180
            : mobileMedium ? 190
                : mobileLarge ? 200
                    : midWindow ? 240
                        : 100

    const chartMargin = {top: 0, right: 0, bottom: 30, left: 0}

    //const blueColors = ['#aeaeae', '#0364ac', '#0364ac', '#0364ac', '#0364ac']

    return (
        <div style={{height: chartHeight, width: '100%'}}>
            <ResponsiveBar
                data={barData}
                indexBy='date'
                keys={[
                    'videos',
                    'new',
                    'featured',
                    ]}

                margin={chartMargin}
                padding={0.15}
                groupMode="stacked"
                colors={{ scheme: 'nivo' }}
                animate={true}
                enableLabel={false}
                axisTop={null}
                axisRight={null}
                axisLeft={null}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d'
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
                enableGridY={false}
                theme={primaryTheme}
                isInteractive={false}
            />
        </div>
    )
}
export default Component
