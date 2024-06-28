import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'


import {channelFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'

import SiteReportMain from './SiteReportMain.jsx'
import {ReportingProvider} from '../youtubeContext/ReportingProvider.jsx'

function SiteReportRoute() {

    document.title = 'lockpicking.tv - Site Report'

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <ReportingProvider>
                        <Nav title='Site Report' route='rep'/>
                        <SiteReportMain/>
                        <Footer/>
                        <Tracker feature='sitereport'/>
                    </ReportingProvider>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default SiteReportRoute
