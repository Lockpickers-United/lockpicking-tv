import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import ChannelCard from './ChannelCard.jsx'

import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'

import LPTVlogo from '../assets/LPTVlogo-tvset.jsx'
import Card from '@mui/material/Card'
import VideoCard from './VideoCard.jsx'

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

    const video = {
        'channelId': 'UCKdlgO_jR6G5Zf2b3rWRdEA',
        'id': '2kbYTGa_O3c',
        'title': 'LockPicking Lawyer Stopped Into My Live!',
        'thumbnail': 'https://i.ytimg.com/vi/2kbYTGa_O3c/mqdefault.jpg',
        'thumbnailHigh': 'https://i.ytimg.com/vi/2kbYTGa_O3c/hqdefault.jpg',
        'publishedAt': '2024-05-18T00:56:23Z',
        'viewCount': '816',
        'likeCount': '57',
        'favoriteCount': '0',
        'commentCount': '24'
    }

    return (

        <ThemeProvider theme={theme}>
            <Grid container spacing={{xs: 1, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}} style={{marginTop: 8}}>
                <Grid item xs={4} sm={4} md={4}>
                    <Card style={{backgroundColor: 'transparent', boxShadow: 'none', padding: 10, textAlign: 'center'}}>
                        <LPTVlogo height={170}/>
                    </Card>
                </Grid>

                <Grid item xs={4} sm={4} md={4}>
                    <VideoCard
                        video={video}
                        expanded={video.id === defExpanded}
                        onExpand={setExpanded}
                    />
                </Grid>

                {channels.map((channel, index) =>
                    <Grid item xs={4} sm={4} md={4} key={index}>
                        <ChannelCard
                            key={channel.id}
                            channel={channel}
                            expanded={channel.id === defExpanded}
                            onExpand={setExpanded}
                        />
                    </Grid>
                )}

            </Grid>
        </ThemeProvider>
    )
}

export default Channels
