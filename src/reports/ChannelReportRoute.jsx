import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import ChannelReportMain from './ChannelReportMain.jsx'
import {channelFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'

function ChannelReportRoute() {

    document.title = 'lockpicking.tv - Contact Us'

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <Nav title='Contact' route='co' noSearch={true}/>
                    <ChannelReportMain/>
                    <Footer/>
                    <Tracker feature='contact'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>

    )
}

export default ChannelReportRoute
