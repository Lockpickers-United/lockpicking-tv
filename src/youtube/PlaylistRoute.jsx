import React from 'react'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import PlaylistMain from './PlaylistMain.jsx'
import Footer from '../nav/Footer.jsx'

function PlaylistRoute() {

    return (
        <FilterProvider filterFields={channelFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <PlaylistMain/>
                        <Footer/>
                    </ListProvider>
                </DataProvider>
        </FilterProvider>
    )
}

export default PlaylistRoute
