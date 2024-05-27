import React, {useContext} from 'react'
import LoadingContext, {LoadingProvider} from '../youtubeContext/LoadingContextPages.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderPages.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {ytFilterFields} from '../data/filterFields'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import PagesMain from './PagesMain.jsx'
import Nav from '../nav/Nav.jsx'

function PagesRoute() {

    return (
        <FilterProvider filterFields={ytFilterFields}>
            <LoadingProvider>
                <DataProvider>
                    <ListProvider>
                        <PagesMain/>
                    </ListProvider>
                </DataProvider>
            </LoadingProvider>
        </FilterProvider>
    )
}

export default PagesRoute
