import React, {useCallback, useContext, useEffect, useState} from 'react'
import DataContext from '../app/DataContext.jsx'
import Grid from '@mui/material/Grid'
import LoadingContext from '../context/LoadingContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import Nav from '../nav/Nav.jsx'
import VideoCard from './VideoCard.jsx'
import MainVideoPlayer from './MainVideoPlayer.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import FilterContext from '../context/FilterContext.jsx'
import SortButton from '../filters/SortButton.jsx'
import {videoSortFields} from '../data/sortFields'
import Tracker from '../app/Tracker.jsx'
import config from '../app/config'

function VideosMain() {

    const {visibleItems} = useContext(DataContext)
    const {filters} = useContext(FilterContext)
    const {page} = filters

    const {title, introCopy} = config.pages[page]

    const {allDataLoaded} = useContext(LoadingContext)
    const [currentPage, setCurrentPage] = useState(undefined)
    const [mainItem, setMainItem] = useState(visibleItems[0])
    const [index, setIndex] = useState(0)
    const [playing, setPlaying] = useState(mainItem?.id) //eslint-disable-line
    const [expanded, setExpanded] = useState(false)
    const [track, setTrack] = useState(true)

    const handlePlaylistClick = useCallback((item, index) => {
        setPlaying(item.id)
        setMainItem(item)
        setIndex(index)
        setExpanded(true)
    }, [])

    document.title = `lockpicking.tv - ${title}`

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
    const smallWindow = width <= 600
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '28px 8px 32px 8px'

    const [playerHeight, setPlayerHeight] = useState(0)

    const playerOnlyHeight = document.getElementById('mainPlayer') ? document.getElementById('mainPlayer').offsetHeight : 1
    const videoStatsHeight = expanded ? 1 : 0
    const fullHeight = playerOnlyHeight + videoStatsHeight - 30

    if (document.getElementById('spacerDiv') && playerHeight !== fullHeight) {
        setTimeout(() => {
            setPlayerHeight(fullHeight)
        }, 500)
    }

    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!init || !mainItem || (currentPage !== page)) {
            setMainItem(visibleItems[0])
            setPlaying(visibleItems[0]?.id)
            setIndex(0)
            setCurrentPage(page)
            setInit(true)
            setTrack(false)
        }
    }, [index, init, mainItem, visibleItems, page, currentPage, playerHeight, fullHeight, expanded])

    const navExtras = <SortButton sortValues={videoSortFields}/>

    if (!allDataLoaded || !visibleItems) {
        return (
            <div style={{marginTop: 30}}>
                <LoadingDisplay/>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div id='fullPage'>
                <Nav title='lockpicking.tv - {pageData.title}' route='vid' extras={navExtras}/>

                {(mainItem?.kind === 'youtube#video') &&
                    <React.Fragment>
                        <MainVideoPlayer
                            video={mainItem}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            track={track}
                        />
                        <div style={{height: playerHeight, transition: 'all 0.4s'}} id='spacerDiv'/>
                    </React.Fragment>
                }

                <div style={{
                    minWidth: '320px', height: '100%',
                    padding: pagePadding,
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 0
                }}>

                    <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>
                        <div style={{color: '#222', lineHeight: '1.3rem', marginBottom: 20, marginTop: 20}}>

                            <span style={{fontSize: '1.1rem', fontWeight: 600}}>
                                {title}
                            </span> ({visibleItems.length})<br/>
                            {introCopy}
                        </div>

                        <ThemeProvider theme={theme}>
                            <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                                  style={{}} id='grid'>
                                {visibleItems.map((item, index) =>
                                    <Grid item xs={4} sm={4} md={4} key={item.id}>
                                        <VideoCard
                                            video={item}
                                            handlePlaylistClick={handlePlaylistClick}
                                            index={index}
                                            listType='videos'
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </ThemeProvider>
                        <div style={{display: 'block', clear: 'both'}}/>
                    </div>
                </div>
            </div>
            <Tracker feature='videos' page={page}/>
        </React.Fragment>
    )
}

export default VideosMain
