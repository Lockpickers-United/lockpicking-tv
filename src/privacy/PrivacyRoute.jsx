

import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import PrivacyPage from './PrivacyPage'

import {channelFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'

function PrivacyRoute() {

    document.title = 'lockpicking.tv - Privacy Policy'

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <Nav title='Privacy' route='priv' noSearch={true}/>
                    <PrivacyPage/>
                    <Footer/>
                    <Tracker feature='privacy'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default PrivacyRoute