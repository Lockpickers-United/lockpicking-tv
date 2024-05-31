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
    const {allItems} = useContext(LoadingContext)

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
        return allItems
            .filter(datum => {
                return filterArray.every(({key, value}) => {
                    return Array.isArray(datum[key])
                        ? datum[key].includes(value)
                        : datum[key] === value
                })
            })

    }, [filters, allItems])

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
                if (sort === 'new') {
                    return Math.floor(dayjs(b.publishedAt).valueOf() / 60000) * 60000 - Math.floor(dayjs(a.publishedAt).valueOf() / 60000) * 60000
                        || a.title.localeCompare(b.title)
                } else {
                    return 1
                }
            })

    }, [search, filteredItems, sort])

    const getItemFromId = useCallback(channelId => {
        return allItems?.find(({id}) => id === channelId)
    }, [allItems])

    const getNameFromId = useCallback(id => {
        const channel = getItemFromId(id)
        return channel ? channel.title : ''
    }, [getItemFromId])

    const value = useMemo(() => ({
        visibleItems,
        getItemFromId,
        getNameFromId
    }), [
        visibleItems,
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

