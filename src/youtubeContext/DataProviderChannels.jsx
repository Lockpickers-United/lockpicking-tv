import React, {useCallback, useMemo, useContext} from 'react'
import LoadingContext from './LoadingProvider.jsx'
import DataContext from '../app/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import dayjs from 'dayjs'

export function DataProvider({children}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, guide, showAll, page, ...filters} = allFilters
    const {allChannels, featuredChannels, newChannels} = useContext(LoadingContext)

    const channelSet = page
    const channels = page === 'featured'
        ? featuredChannels
        : page === 'newChannels'
            ? newChannels
            : allChannels

    const mappedChannels = channels.map(channel => {
        if (channel.kind !== 'youtube#channel') { return }
        return {
            id: channel.channelId,
            kind: channel.kind,
            viewCount: channel?.statistics?.viewCount ? parseInt(channel.statistics.viewCount) : 0,
            subscriberCount: parseInt(channel.statistics.subscriberCount),
            videoCount: parseInt(channel.statistics.videoCount),
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.default.url,
            customUrl: channel.snippet.customUrl,
            publishedAt: channel.snippet.publishedAt,
            latestVideo: channel.latestVideo,
            fuzzy: channel.snippet.title + ', ' + channel.snippet.customUrl
        }
    })

    const filteredChannels = useMemo(() => {

        // Filters as an array
        const filterArray = Object.keys(filters)
            .map(key => {
                const value = filters[key]
                return Array.isArray(value)
                    ? value.map(subkey => ({key, value: subkey}))
                    : {key, value}
            })
            .flat()

        // Filter the data
        return mappedChannels
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })

    }, [filters, mappedChannels])

    const visibleChannels = useMemo(() => {

        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filteredChannels, {keys: fuzzySortKeys, threshold: -25000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filteredChannels

        return searched.sort((a, b) => {
                if (sort === 'views') {
                    return b.viewCount - a.viewCount
                        || a.title.localeCompare(b.title)
                } else if (sort === 'videos') {
                    return b.videoCount - a.videoCount
                        || a.title.localeCompare(b.title)
                } else if (sort === 'subscribers') {
                    return b.subscriberCount - a.subscriberCount
                        || a.title.localeCompare(b.title)
                } else if (sort === 'new') {
                    return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
                        || a.title.localeCompare(b.title)
                } else if (sort === 'latest') {
                    return Math.floor(dayjs(b.latestVideo).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.latestVideo).valueOf() / 60000) * 60000
                        || a.title.localeCompare(b.title)
                } else {
                    return a.title.localeCompare(b.title)
                }
            })

    }, [filteredChannels, search, sort])

    const getChannelFromId = useCallback(channelId => {
        return allChannels?.find(({id}) => id === channelId)
    }, [allChannels])

    const getNameFromId = useCallback(id => {
        const channel = getChannelFromId(id)
        return channel ? channel.title : ''
    }, [getChannelFromId])

    const value = useMemo(() => ({
        visibleChannels,
        getChannelFromId,
        getNameFromId,
        channelSet
    }), [
        visibleChannels,
        getChannelFromId,
        getNameFromId,
        channelSet
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

