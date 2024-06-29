import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'

import {siteFull, siteSummary, channelReportData, channelIndex, videoIndex, pageIndex} from '../data/dataUrls'
const urls = {siteFull, siteSummary, channelReportData, channelIndex, videoIndex, pageIndex}

const ReportingContext = React.createContext({})

export function ReportingProvider({children}) {

    const {data, loading, error} = useData({urls})
    const {siteFull, siteSummary, channelReportData, channelIndex, videoIndex, pageIndex} = data || {}
    const jsonLoaded = (!loading && !error && !!data)
    const allDataLoaded = (jsonLoaded)

    const getPageIdFromPartialId = useCallback(pageId => {
        const pageIds = Object.keys(pageIndex)
        return pageIds.find(id => id.includes(pageId))
    }, [pageIndex])

    const value = useMemo(() => ({
        allDataLoaded,
        siteFull,
        siteSummary,
        channelReportData,
        channelIndex,
        videoIndex,
        pageIndex,
        getPageIdFromPartialId
    }), [
        allDataLoaded,
        siteFull,
        siteSummary,
        channelReportData,
        channelIndex,
        videoIndex,
        pageIndex,
        getPageIdFromPartialId
    ])

    return (
        <ReportingContext.Provider value={value}>
            {children}
        </ReportingContext.Provider>
    )
}

export default ReportingContext

