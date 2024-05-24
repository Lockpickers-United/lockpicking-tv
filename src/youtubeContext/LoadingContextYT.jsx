import React, {useCallback, useMemo} from 'react'
import useData from '../util/useData'
import {youtubeData} from '../data/dataUrls'

const LoadingContext = React.createContext({})
const urls = {youtubeData}

export function LoadingProvider({children}) {
    const {data, loading, error} = useData({urls})
    const {youtubeData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const channels = useMemo(() => youtubeData || [], [youtubeData])

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
        getChannelFromId
    }), [
        allDataLoaded,
        allChannels,
        getChannelFromId
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

