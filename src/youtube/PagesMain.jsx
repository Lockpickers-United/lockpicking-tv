import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import ChannelCard from './ChannelCard.jsx'

import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'

import VideoCard from './VideoCard.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingContext from '../youtubeContext/LoadingContextPages.jsx'
import Nav from '../nav/Nav.jsx'

function PagesMain({items}) {

    const {allItems, allDataLoaded} = useContext(LoadingContext)
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

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    const featureWidth = smallWindow ? 4 : 4
    //TODO change width on video play?

    const xsWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '28px 8px 32px 8px'


    const featuredVideo = false

    if (!allDataLoaded) {
        return null
    }
    return (
        <React.Fragment>
            <Nav title='lockpicking.tv - Page Name' route='pg'/>

            <div style={{
                minWidth: '320px', height: '100%',
                padding: pagePadding,
                marginLeft: 'auto', marginRight: 'auto', marginTop: 0
            }}>
                <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>

                    <ThemeProvider theme={theme}>
                        <Grid container spacing={{xs: 1, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                              style={{}}>
                            {(featuredVideo) &&
                                <Grid item xs={8} sm={4} md={featureWidth}>
                                    <VideoCard
                                        video={video}
                                        expanded={video.id === defExpanded}
                                        onExpand={setExpanded}
                                    />
                                </Grid>
                            }

                            {allItems.map((item, index) =>
                                <Grid item xs={4} sm={4} md={4} key={index}>
                                    <VideoCard
                                        video={item}
                                        expanded={item.id === defExpanded}
                                        onExpand={setExpanded}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </ThemeProvider>

                    <div style={{display: 'block', clear: 'both'}}/>

                </div>
            </div>
        </React.Fragment>

    )
}

export default PagesMain