import React from 'react'
import Footer from '../nav/Footer'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderChannels.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {channelFilterFields} from '../data/filterFields'
import ChannelsTableMain from './ChannelsTableMain.jsx'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


function ChannelsTableRoute() {

    const lightTheme = createTheme({
        palette: {
            mode: 'light'
        }
    })

    return (
        <FilterProvider filterFields={channelFilterFields}>
            <DataProvider>
                <ListProvider>
                    <ThemeProvider theme={lightTheme}>
                        <CssBaseline/>

                        <div style={{backgroundColor: '#ddd'}}>
                            <ChannelsTableMain/>
                        </div>

                        <Footer/>
                    </ThemeProvider>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )
}

export default ChannelsTableRoute
