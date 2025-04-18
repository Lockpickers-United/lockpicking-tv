import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {primaryTheme} from '../chartDefaults'
import useWindowSize from '../../util/useWindowSize'

function PageViewsLine({data}) {
    const {pageViews} = data

    const {width} = useWindowSize()
    const mobileSmall = width <= 360
    const smallWindow = width <= 560

    const chartHeight = mobileSmall ? 260
        : !smallWindow ? 350 : 300

    return (
        <div style={{height: chartHeight}}>
            <ResponsiveLine
                theme={combinedTheme}
                data={pageViews}
                colors={['#4fa720']}
                lineWidth={3}
                margin={{top: 10, right: 20, bottom: 50, left: 55}}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d'
                }}
                xFormat='time:%m/%d/%y'
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                curve='basis'
                axisBottom={{
                    format: '%b %d',
                    tickValues: 'every 1 week',
                    legendOffset: -12
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: ','
                }}
                enableGridX={false}
                enablePoints={false}
                useMesh={true}
                isInteractive={false}
            />
        </div>
    )
}

const gridTheme = {
    grid: {
        line: {
            stroke: '#333',
            strokeWidth: 1
        }
    }
}

const combinedTheme = {
    ...primaryTheme,
    ...gridTheme
}

export default PageViewsLine
