import React, {useContext, useMemo} from 'react'
import LoadingContext from '../context/LoadingContext.jsx'

const TagsContext = React.createContext({})

export function TagsProvider({children}) {

    const {allVideos, tagCounts} = useContext(LoadingContext)

    const makeNames = tagCounts.reduce((acc, tagDatum) => {
        const makeValue = tagDatum.value.replace(' ', '')
        acc[makeValue] = tagDatum.value
        return acc
    }, {})

    const tagCountData = tagCounts
        .filter(tagDatum => tagDatum.count > 1)
        .sort((a, b) => {
            return parseInt(b.count) - parseInt(a.count)
        })
        //.slice(0, 75)
        .sort((a, b) => {return a.value.localeCompare(b.value)})

    const taggedVideos = allVideos.filter(video => {
           return video.videoFlags?.includes('tagged')
        }
    ).filter(x => x)

    const value = useMemo(() => ({
        taggedVideos,
        tagCountData,
        makeNames
    }), [
        taggedVideos,
        tagCountData,
        makeNames
    ])

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    )
}

export default TagsContext

