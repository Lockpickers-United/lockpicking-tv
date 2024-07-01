import React from 'react'
import Footer from '../nav/Footer'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import ChannelsMain from './ChannelsMain.jsx'

function ChannelRoute() {

    return (
        <FilterProvider filterFields={channelFilterFields}>
                <DataProvider>
                    <ListProvider>
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
