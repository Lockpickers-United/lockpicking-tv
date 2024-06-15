import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import AboutPage from './AboutPage.jsx'
import {channelFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'

function AboutRoute() {

    document.title = 'lockpicking.tv - About'

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <Nav title='About' route='abt' noSearch={true}/>
                    <AboutPage/>
                    <Footer hide={true}/>
                    <Tracker feature='about'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default AboutRoute
