import React from 'react'
import {LoadingProvider} from '../youtubeContext/LoadingProvider.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {ytFilterFields} from '../data/filterFields'
import PagesMain from './PagesMain.jsx'
import Footer from '../nav/Footer.jsx'

function PagesRoute() {

    return (
        <FilterProvider filterFields={ytFilterFields}>
            <LoadingProvider>
                <DataProvider>
                    <ListProvider>
                        <PagesMain/>
                        <Footer/>

                    </ListProvider>
                </DataProvider>
            </LoadingProvider>
        </FilterProvider>
    )
}

export default PagesRoute
