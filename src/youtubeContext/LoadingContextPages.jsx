import React, {useCallback, useContext, useMemo} from 'react'
import useData from '../util/useData'
import {pagesData, channelData} from '../data/dataUrls'
import FilterContext from '../context/FilterContext.jsx'

const LoadingContext = React.createContext({})
const urls = {pagesData, channelData}

export function LoadingProvider({children}) {

    const {filters} = useContext(FilterContext)
    const {page} = filters
    const {data, loading, error} = useData({urls})
    const {pagesData, channelData} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    console.log('page', page)

    document.title = 'lockpicking.tv - Section Name'

    const getPageFromId = ((id) => {
        return pagesData?.find(page => page.sectionId === id)
    })

    const pageData = jsonLoaded
        ? getPageFromId(page)
            ? getPageFromId(page)
            : pagesData[1]
        : {}

    console.log('channelData', channelData)

    const items = jsonLoaded ? pageData.items : []

    const allItems = items.map((item) => {
        return {
            ...item,
            fuzzy: item.title
        }
    })

    console.log(allItems)

    const getChannelFromId = useCallback(channelId => {
        return channelData['fullChannels'].find(({id}) => id === channelId)
    }, [channelData])


    const allDataLoaded = ((jsonLoaded))

    const value = useMemo(() => ({
        allDataLoaded,
        allItems,
        getChannelFromId
    }), [
        allDataLoaded,
        allItems,
        getChannelFromId
    ])

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext

