import React, {useCallback, useContext, useDeferredValue, useEffect, useState} from 'react'
import DataContext from '../app/DataContext.jsx'
import Grid from '@mui/material/Grid'
import ListContext from '../context/ListContext'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import Nav from '../nav/Nav.jsx'
import PlaylistItemCard from './PlaylistItemCard.jsx'
import PlaylistMainVideo from './PlaylistMainVideo.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'
import FilterContext from '../context/FilterContext.jsx'

function PlaylistMain() {
    const {visibleItems, pageData} = useContext(DataContext)
    const navigate = useNavigate()
    const {filters} = useContext(FilterContext)
    const {page} = filters

    const [currentPage, setCurrentPage] = useState(page)

    const {getPageFromId, allDataLoaded} = useContext(LoadingContext)

    const parent = pageData?.parentId
        ? getPageFromId(pageData.parentId)
        : null
    const parentUrl = parent
        ? `/pages?page=${parent.sectionId}&name=${parent.sectionName}`
        : null
    const handleClick = useCallback(() => {
        navigate(parentUrl)
    }, [navigate, parentUrl])

    const parentLink = parent
        ? <span><a onClick={() => handleClick()} style={{
            color: '#1745a7', cursor: 'pointer', fontWeight: 700
        }}>{parent.title}</a> &gt; </span>
        : null

    const [mainItem, setMainItem] = useState(visibleItems[0])
    const [index, setIndex] = useState(0) //eslint-disable-line
    const [playing, setPlaying] = useState(mainItem?.id)

    const handlePlaylistClick = useCallback((item, index) => {
        setPlaying(item.id)
        setMainItem(item)
        setIndex(index)
    }, [])

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
    const smallWindow = width <= 600

    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '28px 8px 32px 8px'

    const widths = [440, 600, 800, 1200, 9999]
    const widthIndex = widths.indexOf(widths.find(option => {
        return option >= width
    }))
    const appBarHeights = [407, 430, 530, 640, 640]
    const [appBarHeight, setAppBarHeight] = useState(appBarHeights[widthIndex])
    if (document.getElementById('mainPlayer') && appBarHeight !== document.getElementById('mainPlayer').offsetHeight) {
        setAppBarHeight(document.getElementById('mainPlayer').offsetHeight)
    }

    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!init || !mainItem || (currentPage !== page )) {
            setMainItem(visibleItems[0])
            setPlaying(visibleItems[0]?.id)
            setIndex(0)
            setCurrentPage(page)
            setInit(true)
        }
    }, [appBarHeight, index, init, mainItem, visibleItems, page, currentPage])

    return (
        <React.Fragment>
            <Nav title='lockpicking.tv - {pageData.title}' route='pg' displayVideo={mainItem}/>

            {(mainItem?.kind === 'youtube#video' && (pageData?.kind === 'singleplaylist' || pageData?.type === 'singleplaylist')) &&
                <React.Fragment>
                    <PlaylistMainVideo
                        video={mainItem}
                    />
                    <div style={{height: appBarHeight}} id='spacerDiv'/>
                </React.Fragment>
            }

            {(!allDataLoaded || !visibleItems) &&
                <div style={{marginTop: 30}}>
                    <LoadingDisplay/>
                </div>
            }

            {(allDataLoaded && visibleItems) &&

                <div style={{
                    minWidth: '320px', height: '100%',
                    padding: pagePadding,
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 0
                }}>

                    <div style={{maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto'}}>
                        <div style={{color: '#222', lineHeight: '1.3rem', marginBottom: 20}}>

                            <span style={{fontSize: '1.1rem', fontWeight: 600}}>
                                {parentLink} {pageData.title}
                            </span><br/>
                            {pageData.description}
                        </div>

                        <ThemeProvider theme={theme}>
                            <Grid container spacing={{xs: 2, sm: 2, md: 2}} columns={{xs: 4, sm: 8, md: 12}}
                                  style={{}}>
                                {visibleItems.map((item, index) =>
                                    <Grid item xs={4} sm={4} md={4} key={item.id}>
                                        <PlaylistItemCard
                                            video={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                            handlePlaylistClick={handlePlaylistClick}
                                            index={index}
                                            playing={playing}
                                            setPlaying={setPlaying}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </ThemeProvider>
                        <div style={{display: 'block', clear: 'both'}}/>
                    </div>
                </div>
            }
        </React.Fragment>

    )
}

export default PlaylistMain
