import VideoCard from './VideoCard.jsx'
import React, {useContext, useDeferredValue} from 'react'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import ListContext from '../context/ListContext.jsx'


const ItemCard = ({item}) => {

    console.log('item',item)

    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    if (item.kind === 'youtube#video') {
        return <VideoCard
            video={item}
            expanded={item.id === defExpanded}
            onExpand={setExpanded}
        />
    } else {
        return <LoadingDisplay/>
    }


}

export default ItemCard
