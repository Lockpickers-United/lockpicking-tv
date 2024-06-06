import React, {useCallback, useMemo, useContext} from 'react'
import LoadingContext from './LoadingContext.jsx'
import DataContext from '../app/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import fuzzysort from 'fuzzysort'
import removeAccents from 'remove-accents'
import dayjs from 'dayjs'

export function DataProvider({children}) {

    const {filters: allFilters} = useContext(FilterContext)
    const {search, id, tab, name, sort, image, guide, showAll, page, ...filters} = allFilters
    const {pagesData, getPageFromId, allDataLoaded} = useContext(LoadingContext)

    const pageData = allDataLoaded
        ? getPageFromId(page)
            ? getPageFromId(page)
            : pagesData[1]
        : null

    const items = allDataLoaded ? pageData.items : []
    const mappedItems = items.map((item) => {
        return {
            ...item,
            fuzzy: item.title
        }
    })



    const filteredItems = useMemo(() => {

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
        return mappedItems
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })

    }, [filters, mappedItems])

    const visibleItems = useMemo(() => {

        // If there is a search term, fuzzy match that
        const searched = search
            ? fuzzysort.go(removeAccents(search), filteredItems, {keys: fuzzySortKeys, threshold: -25000})
                .map(result => ({
                    ...result.obj,
                    score: result.score
                }))
            : filteredItems

        // console.log('searched', searched)

        return searched.sort((a, b) => {
            if (sort === 'views') {
                return parseInt(b.viewCount) - parseInt(a.viewCount)
                    || a.title.localeCompare(b.title)
            } else if (sort === 'likes') {
                return parseInt(b.likeCount) - parseInt(a.likeCount)
                    || a.title.localeCompare(b.title)
            } else if (sort === 'comments') {
                return parseInt(b.commentCount) - parseInt(a.commentCount)
                    || a.title.localeCompare(b.title)
            } else if (sort === 'channel') {
                return a.channelOwner.localeCompare(b.channelOwner)
                    || parseInt(b.commentCount) - parseInt(a.commentCount)
            } else if (sort === 'new') {
                return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
                    || a.title.localeCompare(b.title)
            } else {
                return 1
            }
        })

    }, [search, filteredItems, sort])


    const getItemFromId = useCallback(channelId => {
        return mappedItems?.find(({id}) => id === channelId)
    }, [mappedItems])

    const getNameFromId = useCallback(id => {
        const channel = getItemFromId(id)
        return channel ? channel.title : ''
    }, [getItemFromId])

    const value = useMemo(() => ({
        visibleItems,
        pageData,
        getItemFromId,
        getNameFromId
    }), [
        visibleItems,
        pageData,
        getItemFromId,
        getNameFromId
    ])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const fuzzySortKeys = ['fuzzy']

