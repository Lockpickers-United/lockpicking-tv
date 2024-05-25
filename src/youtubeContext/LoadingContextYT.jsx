import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {youtubeData, youtubeDataFull, youtubeDataNew} from '../data/dataUrls'

const LoadingContext = React.createContext({})
const urls = {youtubeData, youtubeDataFull, youtubeDataNew}

export function LoadingProvider({children, channelSet}) {

    const {data, loading, error} = useData({urls})
    const {youtubeData, youtubeDataFull, youtubeDataNew} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const featuredChannels = useMemo(() => youtubeData || [], [youtubeData])
    const fullChannels = useMemo(() => youtubeDataFull || [], [youtubeDataFull])
    const newChannels = useMemo(() => youtubeDataNew || [], [youtubeDataNew])

    const channels = channelSet === 'featured'
        ? featuredChannels
        : channelSet === 'new'
            ? newChannels
            : fullChannels

    const allChannels = channels.map(channel => {
        return {
            id: channel.channelId,
            viewCount: parseInt(channel.statistics.viewCount),
            subscriberCount: parseInt(channel.statistics.subscriberCount),
            videoCount: parseInt(channel.statistics.videoCount),
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.default.url,
            customUrl: channel.snippet.customUrl,
            publishedAt: channel.snippet.publishedAt,
            fuzzy: channel.snippet.title + ', ' + channel.snippet.customUrl
        }
    })

    const getChannelFromId = useCallback(channelId => {
        return allChannels?.find(({id}) => id === channelId)
    }, [allChannels])


    const allDataLoaded = ((jsonLoaded))

    const value = useMemo(() => ({
        allDataLoaded,
        allChannels,
        getChannelFromId,
        channelSet
    }), [
        allDataLoaded,
        allChannels,
        getChannelFromId,
        channelSet
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

