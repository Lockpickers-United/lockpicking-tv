import React from 'react'
import AdminStatsTable from '../AdminStatsTable'
import useWindowSize from '../../util/useWindowSize'
import dayjs from 'dayjs'

const SiteReportSummaryTable = ({fullData}) => {

    const data = fullData.traffic28days

    const daysToReport = 28

    function lastN(row) {
        return dayjs().subtract(daysToReport + 1, 'day').isBefore(dayjs(row.date))
    }

    const tabledata = {
        columns: data.columns
            .filter(column => column.id !== 'weekend')
            .filter(column => column.id !== 'visitors')
            .filter(column => column.id !== 'lockViews')
            .filter(column => column.id !== 'watchedVideos')
            .filter(column => column.id !== 'watchedVideos30')
            .filter(column => column.id !== 'watchedVideos60'),
        data: data.data.filter(lastN)
    }

    const totalVisits = tabledata.data.reduce((acc, row) => {
        return acc + row.visits
    }, 0)
    const totalPageViews = tabledata.data.reduce((acc, row) => {
        return acc + row.pageViews
    }, 0)
    const averages = {
        date: 'Ave',
        dateString: 'Average',
        visits: Math.round(totalVisits / daysToReport),
        pageViews: Math.round(totalPageViews / daysToReport)
    }
    tabledata.data.push(averages)

    const {width} = useWindowSize()
    const mobile360 = width <= 360
    const mobile395 = width <= 395
    const mobile428 = width <= 428  // but test also at 412
    const window560 = width <= 560
    const window820 = width <= 820

    const fontSize = mobile360 ? '.8rem'
        : mobile395 ? '.85rem'
            : mobile428 ? '.9rem'
                : window560 ? '.9rem'
                    : window820 ? '.9rem'
                        : '.85rem'

    const tableWidth = 180
    const tableHeight = 340

    return (
        <AdminStatsTable
            tableData={tabledata}
            tableWidth={tableWidth}
            tableHeight={tableHeight}
            fontSize={fontSize}
        />
    )
}

export default SiteReportSummaryTable
