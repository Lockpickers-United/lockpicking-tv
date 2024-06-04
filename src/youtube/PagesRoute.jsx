import React from 'react'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {ytFilterFields} from '../data/filterFields'
import PagesMain from './PagesMain.jsx'
import Footer from '../nav/Footer.jsx'

function PagesRoute() {

    return (
        <FilterProvider filterFields={ytFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <PagesMain/>
                        <Footer/>
                    </ListProvider>
                </DataProvider>
        </FilterProvider>
    )
}

export default PagesRoute
