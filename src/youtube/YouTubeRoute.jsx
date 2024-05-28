import React from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {LoadingProvider} from '../youtubeContext/LoadingProvider.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {ytFilterFields} from '../data/filterFields'
import YouTubeMain from './YouTubeMain.jsx'


function YoutTubeRoute({channelSet}) {

    document.title = 'LPU Locks - YouTube Directory'

    return (
        <FilterProvider filterFields={ytFilterFields}>
            <LoadingProvider channelSet={channelSet}>
                <DataProvider channelSet={channelSet}>
                    <ListProvider>
                        <Nav title='YouTube Directory' route='yt'/>

                        <div style={{backgroundColor: '#ccc'}}>
                            <YouTubeMain/>
                        </div>

                        <Footer/>
                    </ListProvider>
                </DataProvider>
            </LoadingProvider>
        </FilterProvider>
    )
}

export default YoutTubeRoute
