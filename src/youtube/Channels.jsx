import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import NoEntriesCardLB from '../lockbazaar/NoEntriesCardLB.jsx'
import ChannelCard from './ChannelCard.jsx'

import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SortFilterBarYT from './SortFilterBarYT.jsx'

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

    return (


        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid item xs={12}>
                <Item style={{backgroundColor:'rgb(26, 32, 39)'}}>
                    <SortFilterBarYT/>
                </Item>
            </Grid>

            {channels.map((channel, index) =>

                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item>
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

    )
}

export default Channels
