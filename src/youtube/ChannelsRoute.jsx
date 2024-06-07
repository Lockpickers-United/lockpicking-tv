import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import ChannelsMain from './ChannelsMain.jsx'
import {channelSortFields} from '../data/sortFields'
import SortButton from '../filters/SortButton.jsx'


function ChannelRoute() {

    const extras = <SortButton sortValues={channelSortFields}/>
    return (
        <FilterProvider filterFields={channelFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='YouTube Directory' route='channels' extras={extras}/>

                        <div style={{backgroundColor: '#ccc'}}>
                            <ChannelsMain/>
                        </div>

                        <Footer/>
                    </ListProvider>
                </DataProvider>
        </FilterProvider>
    )
}

export default ChannelRoute
