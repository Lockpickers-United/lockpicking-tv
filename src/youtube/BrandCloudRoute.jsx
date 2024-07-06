import React from 'react'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderVideos.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import BrandCloudMain from './BrandCloudMain.jsx'
import Footer from '../nav/Footer.jsx'
import {TagsProvider} from '../youtubeContext/TagsProvider.jsx'

export default function BrandCloudRoute() {

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <TagsProvider>
                        <BrandCloudMain/>
                        <Footer/>
                    </TagsProvider>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}
