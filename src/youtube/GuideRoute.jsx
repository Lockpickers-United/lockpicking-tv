import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import GuideMain from './GuideMain.jsx'
import {channelSortFields} from '../data/sortFields'
import SortButton from '../filters/SortButton.jsx'


function GuideRoute({channelSet}) {

    const extras = <SortButton sortValues={channelSortFields}/>
    return (
        <FilterProvider filterFields={channelFilterFields}>
                <DataProvider channelSet={channelSet} channels={channelSet}>
                    <ListProvider>
                        <Nav title='YouTube Directory' route='yt' extras={extras}/>

                        <div style={{backgroundColor: '#ccc'}}>
                            <GuideMain/>
                        </div>

                        <Footer/>
                    </ListProvider>
                </DataProvider>
        </FilterProvider>
    )
}

export default GuideRoute
