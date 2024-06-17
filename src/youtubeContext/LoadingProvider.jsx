import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {pagesData, channelData, videoData} from '../data/dataUrls'
const urls = {pagesData, channelData, videoData}
import LoadingContext from '../context/LoadingContext.jsx'
import config from '../app/config'
import dayjs from 'dayjs'

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
    const allDataLoaded = (jsonLoaded)

    const getPageFromId = useCallback((id) => {
        return allPages.find(page => page.sectionId === id)
    }, [allPages])

    const getPlaylistVideoFromId = useCallback((id) => {
        return videoData?.allVideos.find(video => video.id === id)
    }, [videoData])

    const getSectionFromPlaylistId = useCallback((id) => {
        return allPages.find(page => page.playlistId === id)
    }, [allPages])

    const allVideos = useMemo(() => jsonLoaded ? videoData.allVideos : [], [jsonLoaded, videoData])
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
    const subscriptionChannels = useMemo(() => jsonLoaded
        ? channelData.allChannels.filter(channel => {
            return channel.channelFlags.includes('subscription')
        })
        : [], [jsonLoaded, channelData])


    let videoCounts = {}
    const configNew = config.pages.newVideos
    const newVideoChannelIds = allChannels.map(channel => {
        if (configNew.cohorts.some(r => channel.channelFlags.includes(r))) {
            return channel.id
        }
    }).filter(x => x)
    const newVideos = allVideos
        .filter(video => newVideoChannelIds.includes(video.channelId))
        .filter(video => dayjs(video.publishedAt).isAfter(dayjs().subtract(configNew.maxAge, 'day')))
        .sort((a, b) => {
            return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
        })
        .reduce((acc, video) => {
            if (videoCounts[video.channelId] && videoCounts[video.channelId] < configNew.videosPerChannel) {
                acc.push(video)
                videoCounts[video.channelId]++
            } else if (!videoCounts[video.channelId]) {
                acc.push(video)
                videoCounts[video.channelId] = 1
            }
            return acc
        }, []).slice(0, configNew.maxVideos)


    videoCounts = {}
    const configPopular = config.pages.popular
    const popularVideoChannelIds = allChannels.map(channel => {
        if (configPopular.cohorts.some(r => channel.channelFlags.includes(r))) {
            return channel.id
        }
    }).filter(x => x)
    const popularVideos = allVideos
        .filter(video => popularVideoChannelIds.includes(video.channelId))
        .sort((a, b) => {
            return a.channelOwner.localeCompare(b.channelOwner)
                || parseInt(b.viewCount) - parseInt(a.viewCount)
        })
        .reduce((acc, video) => {
            if (videoCounts[video.channelId] && videoCounts[video.channelId] < configPopular.videosPerChannel) {
                acc.push(video)
                videoCounts[video.channelId]++
            } else if (!videoCounts[video.channelId]) {
                acc.push(video)
                videoCounts[video.channelId] = 1
            }
            return acc
        },[])

    const configFullDirectory = config.pages.fullDirectory
    const fullDirectoryChannels = allChannels.map(channel => {
        if (configFullDirectory.cohorts.some(r => channel.channelFlags.includes(r))) {
            return channel
        }
    }).filter(x => x)

    const getVideosFromIds = useCallback(videoIds => {
        return allVideos.filter(video => videoIds.includes(video.id))
    }, [allVideos])

    const getChannelFromId = useCallback(channelId => {
        return allChannels?.find(({id}) => id === channelId)
    }, [allChannels])

    const value = useMemo(() => ({
        allDataLoaded,
        allChannels,
        subscriptionChannels,
        featuredChannels,
        newChannels,
        fullDirectoryChannels,
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
        subscriptionChannels,
        featuredChannels,
        newChannels,
        fullDirectoryChannels,
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

