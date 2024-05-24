import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import ChannelCard from './ChannelCard.jsx'

import {createTheme, styled, ThemeProvider} from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

import LPTVlogo from '../assets/LPTVlogo-tvset.jsx'

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}))

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

        <ThemeProvider theme={theme}>
            <Grid container spacing={{xs: 1, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}} style={{marginTop: 8}}>
                <Grid item xs={4} sm={4} md={4}>
                    <Item style={{backgroundColor: '#a3a3a3', boxShadow: 'none', padding: 10}}>
                        <LPTVlogo height={170}/>
                    </Item>
                </Grid>

                {channels.map((channel, index) =>
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <Item style={{backgroundColor: '#1A2027'}}>
                            <ChannelCard
                                key={channel.id}
                                channel={channel}
                                expanded={channel.id === defExpanded}
                                onExpand={setExpanded}
                            />
                        </Item>
                    </Grid>
                )}

            </Grid>
        </ThemeProvider>
    )
}

export default Channels
