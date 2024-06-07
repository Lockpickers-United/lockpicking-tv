import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {pagesData, channelData, videoData} from '../data/dataUrls'

import LoadingContext from './LoadingContext.jsx'
import dayjs from 'dayjs'

const urls = {pagesData, channelData, videoData}

export function LoadingProvider({children}) {

    const {data, loading, error} = useData({urls})
    const {pagesData, channelData, videoData} = data || {}
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
    ), [jsonLoaded, pagesData])

    const getPageFromId = useCallback((id) => {
        return pagesData?.find(page => page.sectionId === id)
    }, [pagesData])

    const getPlaylistVideoFromId = useCallback((id) => {
        return videoData?.playlistVideos.find(video => video.id === id)
    }, [videoData])

    const getSectionFromPlaylistId = useCallback((id) => {
        return pagesData?.find(page => page.playlistId === id)
    }, [pagesData])

    const featuredChannels = useMemo(() => jsonLoaded ? channelData.featuredChannels : [], [jsonLoaded, channelData])
    const allChannels = useMemo(() => jsonLoaded ? channelData.fullChannels : [], [jsonLoaded, channelData])
    const newChannels = useMemo(() => jsonLoaded ? channelData.newChannels : [], [jsonLoaded, channelData])

    const newVideosData = useMemo(() => jsonLoaded ? videoData.newVideos : [], [jsonLoaded, videoData])
    const popularVideosData = useMemo(() => jsonLoaded ? videoData.popularVideos : [], [jsonLoaded, videoData])
    const allVideos = useMemo(() => jsonLoaded ? [...newVideosData, ...popularVideosData] : [], [jsonLoaded, newVideosData, popularVideosData])


    const sortNewVideos = newVideosData
        .filter(video => {
            return !!video
        })
        .sort((a, b) => {
            return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
                || a.title.localeCompare(b.title)
        })
    const newVideos = sortNewVideos.slice(0, 75)

    const sortPopularVideos = popularVideosData
        .filter(video => {
            return !!video
        })
        .sort((a, b) => {
            return parseInt(b.viewCount) - parseInt(a.viewCount)
                || a.title.localeCompare(b.title)
        })
    const popularVideos = sortPopularVideos.slice(0, 1000)


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
        pageNavData,
        getPageFromId,
        getPlaylistVideoFromId,
        getSectionFromPlaylistId,
        allVideos,
        newVideos,
        popularVideos
    }), [
        allDataLoaded,
        allChannels,
        featuredChannels,
        newChannels,
        getChannelFromId,
        pagesData,
        pageNavData,
        getPageFromId,
        getPlaylistVideoFromId,
        getSectionFromPlaylistId,
        allVideos,
        newVideos,
        popularVideos
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

