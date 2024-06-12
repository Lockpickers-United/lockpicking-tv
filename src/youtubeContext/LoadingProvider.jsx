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

    const allPages = pagesData?.allPages
    const pageNavData = useMemo(() => (jsonLoaded
            ? allPages.map(page => {
                return {
                    title: page.title,
                    id: page.sectionId,
                    type: page.type
                }
            })
            : []
    ), [jsonLoaded, allPages])

    const getPageFromId = useCallback((id) => {
        return allPages.find(page => page.sectionId === id)
    }, [allPages])

    const getPlaylistVideoFromId = useCallback((id) => {
        return videoData?.allVideos.find(video => video.id === id)
    }, [videoData])

    const getSectionFromPlaylistId = useCallback((id) => {
        return allPages.find(page => page.playlistId === id)
    }, [allPages])


    const allChannels = useMemo(() => jsonLoaded ? channelData.allChannels : [], [jsonLoaded, channelData])
    const featuredChannels = useMemo(() => jsonLoaded
            ? channelData.allChannels.filter(channel => {
                return channel.channelFlags.includes('featured')
            })
            : [], [jsonLoaded, channelData])
    const newChannels = useMemo(() => jsonLoaded
            ? channelData.allChannels.filter(channel => {
                return channel.channelFlags.includes('new')
            })
            : [], [jsonLoaded, channelData])


    const newVideosData = useMemo(() => jsonLoaded
        ? videoData.allVideos.filter(video => video.videoFlags.includes('new') )
        : [], [jsonLoaded, videoData])
    const popularVideosData = useMemo(() => jsonLoaded
        ? videoData.allVideos.filter(video => video.videoFlags.includes('popular') )
        : [], [jsonLoaded, videoData])
    const allVideos = useMemo(() => jsonLoaded ? videoData.allVideos : [], [jsonLoaded, videoData])

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

    const getVideosFromIds = useCallback(videoIds => {
        return allVideos.filter(video => videoIds.includes(video.id))
    },[allVideos])


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
        allPages,
        pageNavData,
        getPageFromId,
        getPlaylistVideoFromId,
        getSectionFromPlaylistId,
        allVideos,
        newVideos,
        popularVideos,
        getVideosFromIds
    }), [
        allDataLoaded,
        allChannels,
        featuredChannels,
        newChannels,
        getChannelFromId,
        allPages,
        pageNavData,
        getPageFromId,
        getPlaylistVideoFromId,
        getSectionFromPlaylistId,
        allVideos,
        newVideos,
        popularVideos,
        getVideosFromIds
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

