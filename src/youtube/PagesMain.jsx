import React, {useCallback, useContext, useDeferredValue} from 'react'
import ChannelCard from './ChannelCard.jsx'
import DataContext from '../app/DataContext.jsx'
import Grid from '@mui/material/Grid'
import ListContext from '../context/ListContext'
import LoadingContext from '../context/LoadingContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import Nav from '../nav/Nav.jsx'
import PlaylistCard from './PlaylistCard.jsx'
import VideoCard from './VideoCard.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'
import Tracker from '../app/Tracker.jsx'

function PagesMain() {
    const navigate = useNavigate()
    const {visibleItems, pageData} = useContext(DataContext)
    const {getPageFromId, allDataLoaded} = useContext(LoadingContext)

    const pageNameParam = pageData?.title.replace(/[\s/]/g, '_').replace(/\W/g, '')

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

    if (!allDataLoaded || !visibleItems) {
        return (
            <div style={{marginTop: 30}}>
                <LoadingDisplay/>
            </div>
        )
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
                                    {item.kind === 'youtube#video' &&
                                        <VideoCard
                                            video={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                            index={index}
                                        />
                                    }
                                    {item.kind === 'youtube#channel' &&
                                        <ChannelCard
                                            channel={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                            index={index}
                                        />
                                    }
                                    {item.kind === 'youtube#playlist' &&
                                        <PlaylistCard
                                            playlist={item}
                                            expanded={item.id === defExpanded}
                                            onExpand={setExpanded}
                                            index={index}
                                        />
                                    }
                                </Grid>
                            )}
                        </Grid>
                    </ThemeProvider>
                    <div style={{display: 'block', clear: 'both'}}/>
                </div>
            </div>

            <Tracker feature='pages' page={pageNameParam} id={pageData.sectionId}/>

        </React.Fragment>

    )
}

export default PagesMain
