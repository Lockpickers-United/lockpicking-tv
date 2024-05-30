import React, {useCallback, useContext, useMemo} from 'react'
import useData from '../util/useData'
import {pagesData, channelData} from '../data/dataUrls'
import FilterContext from '../context/FilterContext.jsx'

import LoadingContext from './LoadingContext.jsx'

const urls = {pagesData, channelData}

export function LoadingProvider({children, channelSet}) {

    const {filters} = useContext(FilterContext)
    const {page} = filters
    const {data, loading, error} = useData({urls})
    const {pagesData, channelData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const pageNavData = useMemo(() => (jsonLoaded
        ? pagesData?.map(page => {
            return {
                title: page.title,
                id: page.sectionId
            }
        })
        : []
    ),[jsonLoaded, pagesData])

    const getPageFromId = ((id) => {
        return pagesData?.find(page => page.sectionId === id)
    })

    const pageData = jsonLoaded
        ? getPageFromId(page)
            ? getPageFromId(page)
            : pagesData[1]
        : null

    const items = jsonLoaded ? pageData.items : []
    const allItems = items.map((item) => {
        return {
            ...item,
            fuzzy: item.title
        }
    })

    const featuredChannels = useMemo(() => jsonLoaded ? channelData.featuredChannels : [], [jsonLoaded, channelData])
    const fullChannels = useMemo(() => jsonLoaded ? channelData.fullChannels : [], [jsonLoaded, channelData])
    const newChannels = useMemo(() => jsonLoaded ? channelData.newChannels : [], [jsonLoaded, channelData])

    const channels = channelSet === 'featured'
        ? featuredChannels
        : channelSet === 'new'
            ? newChannels
            : fullChannels

    const allChannels = channels.map(channel => {
        return {
            id: channel.channelId,
            kind: channel.kind,
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

    const allDataLoaded = (jsonLoaded)

    const value = useMemo(() => ({
        allDataLoaded,
        allChannels,
        getChannelFromId,
        channelSet,
        allItems,
        pageData,
        pageNavData
    }), [
        allDataLoaded,
        allChannels,
        getChannelFromId,
        channelSet,
        allItems,
        pageData,
        pageNavData
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

