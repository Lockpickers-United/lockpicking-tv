import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {primaryTheme} from '../adminChartDefaults'
import useWindowSize from '../../util/useWindowSize'

const SiteReport28DaysLine = ({lineData}) => {

    const fullData = [lineData.traffic28days.data]

    //fullData.columns= fullData.columns.filter(column => column.id !== 'visits')


    const siteLineData = []
    const visitsHash = new Map()
    const pageViewsHash = new Map()

    fullData.forEach((value) => {
        const visitsArray = []
        const pageViewsArray = []

        for (let i = 0; i < value.length; i++) {

            const dataPoint = new Map()
            dataPoint['x'] = value[i]['date']
            dataPoint['y'] = value[i]['visits']
            visitsArray.push(dataPoint)

            const dataPoint2 = new Map()
            dataPoint2['x'] = value[i]['date']
            dataPoint2['y'] = value[i]['pageViews']
            pageViewsArray.push(dataPoint2)
        }
        visitsHash['id'] = 'Visits'
        visitsHash['data'] = visitsArray

        pageViewsHash['id'] = 'Page Views'
        pageViewsHash['data'] = pageViewsArray

        siteLineData.push(visitsHash)
        siteLineData.push(pageViewsHash)
    })

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
        ? {top: 10, right: 20, bottom: 70, left: 50}
        : {top: 10, right: 20, bottom: 50, left: 50}

    const chartWidth = !smallWindow ? '80%' : '100%'


    return (
        <div style={{height: chartHeight, width: chartWidth}}>
            <ResponsiveLine
                theme={primaryTheme}
                data={siteLineData}
                enableGridX={false}
                enableGridY={true}
                colors={['#5265ed', '#4fa720', '#082fd1']}
                lineWidth={3}
                margin={chartMargin}
                height={chartHeight}
                curve='natural'
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 500,
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
                        itemsSpacing: 0,
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

export default SiteReport28DaysLine
