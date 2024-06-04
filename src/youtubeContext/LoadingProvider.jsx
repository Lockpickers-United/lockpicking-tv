import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {pagesData, channelData} from '../data/dataUrls'

import LoadingContext from './LoadingContext.jsx'

const urls = {pagesData, channelData}

export function LoadingProvider({children}) {

    const {data, loading, error} = useData({urls})
    const {pagesData, channelData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const pageNavData = useMemo(() => (jsonLoaded
        ? pagesData?.map(page => {
            return {
                title: page.title,
                id: page.sectionId,
                type: page.type
            }
        })
        : []
    ),[jsonLoaded, pagesData])

    const getPageFromId = useCallback((id) => {
        return pagesData?.find(page => page.sectionId === id)
    },[pagesData])

    const getSectionFromPlaylistId = useCallback((id) => {
        return pagesData?.find(page => page.playlistId === id)
    },[pagesData])

    const featuredChannels = useMemo(() => jsonLoaded ? channelData.featuredChannels : [], [jsonLoaded, channelData])
    const allChannels = useMemo(() => jsonLoaded ? channelData.fullChannels : [], [jsonLoaded, channelData])
    const newChannels = useMemo(() => jsonLoaded ? channelData.newChannels : [], [jsonLoaded, channelData])

    const getChannelFromId = useCallback(channelId => {
        return allChannels?.find(({id}) => id === channelId)
    }, [allChannels])

    const allDataLoaded = (jsonLoaded)

    const value = useMemo(() => ({
        allDataLoaded,
        allChannels,
        featuredChannels,
        newChannels,
        getChannelFromId,
        pagesData,
        getPageFromId,
        getSectionFromPlaylistId,
        pageNavData
    }), [
        allDataLoaded,
        allChannels,
        featuredChannels,
        newChannels,
        getChannelFromId,
        pagesData,
        getPageFromId,
        getSectionFromPlaylistId,
        pageNavData
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

