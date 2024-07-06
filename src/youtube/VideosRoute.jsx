import React from 'react'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderVideos.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {TagsProvider} from '../youtubeContext/TagsProvider.jsx'
import {videoFilterFields} from '../data/filterFields'
import VideosMain from './VideosMain.jsx'
import Footer from '../nav/Footer.jsx'

function VideosRoute() {

    return (
        <FilterProvider filterFields={videoFilterFields}>
            <TagsProvider>
                <DataProvider>
                    <ListProvider>
                        <VideosMain/>
                        <Footer/>
                    </ListProvider>
                </DataProvider>
            </TagsProvider>
        </FilterProvider>
    )
}

export default VideosRoute
