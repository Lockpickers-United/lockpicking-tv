import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import ChannelCard from './ChannelCard.jsx'

import {createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from '@mui/material/Grid'

import VideoCard from './VideoCard.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import Nav from '../nav/Nav.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import PlaylistCard from './PlaylistCard.jsx'
import DataContext from '../app/DataContext.jsx'

function PagesMain() {
    const {visibleItems} = useContext(DataContext)

    const {pageData, allDataLoaded} = useContext(LoadingContext)
    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    document.title = 'lockpicking.tv - ' + pageData?.title

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

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    //TODO change width on video play?

    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '28px 8px 32px 8px'


    if (!allDataLoaded) {
        return <LoadingDisplay/>
    }
    return (
        <React.Fragment>
            <Nav title='lockpicking.tv - {pageData.title}' route='pg'/>

            <div style={{
                minWidth: '320px', height: '100%',
                padding: pagePadding,
                marginLeft: 'auto', marginRight: 'auto', marginTop: 0
            }}>
                <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>
                    <div style={{color:'#222', lineHeight:'1.3rem', marginBottom:20}}>
                        <span style={{fontSize:'1.1rem', fontWeight:600}}>{pageData.title}</span><br/>
                    {pageData.description}
                    </div>

                    <ThemeProvider theme={theme}>
                        <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                              style={{}}>
                            {visibleItems.map((item) =>
                                <Grid item xs={4} sm={4} md={4} key={item.id}>
                                    {item.kind === 'youtube#video' &&
                                        <VideoCard
                                            video={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                        />
                                    }
                                    {item.kind === 'youtube#channel' &&
                                        <ChannelCard
                                            channel={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                        />
                                    }
                                    {item.kind === 'youtube#playlist' &&
                                        <PlaylistCard
                                            playlist={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                        />
                                    }
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
