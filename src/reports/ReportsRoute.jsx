import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import ContactMain from './ContactMain.jsx'
import {channelFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'

function ContactRoute() {

    document.title = 'lockpicking.tv - Contact Us'

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <Nav title='Contact' route='co' noSearch={true}/>
                    <ContactMain/>
                    <Footer/>
                    <Tracker feature='contact'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>

    )
}

export default ContactRoute
