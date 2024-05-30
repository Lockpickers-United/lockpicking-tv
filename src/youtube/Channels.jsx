import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import ChannelCard from './ChannelCard.jsx'

import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'

function Channels({channels}) {

    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 800,
                lg: 1200,
                xl: 1536
            }
        }
    })

    return (

        <div style={{
            minWidth: '320px', height: '100%',
            padding: 0,
            marginLeft: 'auto', marginRight: 'auto', marginTop: 0,
        }}>
            <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>

                <ThemeProvider theme={theme}>
                    <Grid container spacing={{xs: 1, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                          style={{marginTop: -10, marginLeft: -10}}>
                        {channels.map((channel) =>
                            <Grid item xs={4} sm={4} md={4} key={channel.id}>
                                <ChannelCard
                                    channel={channel}
                                    expanded={channel.id === defExpanded}
                                    onExpand={setExpanded}
                                />
                            </Grid>
                        )}
                    </Grid>
                </ThemeProvider>

                <div style={{display: 'block', clear: 'both'}}/>

            </div>
        </div>
    )
}

export default Channels
