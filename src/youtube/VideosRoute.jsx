import React from 'react'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderVideos.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import VideosMain from './VideosMain.jsx'
import Footer from '../nav/Footer.jsx'

function PlaylistRoute() {

    return (
        <FilterProvider filterFields={channelFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <VideosMain/>
                        <Footer/>
                    </ListProvider>
                </DataProvider>
        </FilterProvider>
    )
}

export default PlaylistRoute
