import * as React from 'react'
import PropTypes from 'prop-types'
import {useTheme} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useNavigate} from 'react-router-dom'
import {useCallback, useContext} from 'react'

import Channels from './Channels.jsx'
import LoadingContext from '../youtubeContext/LoadingContextChannels.jsx'
import DataContext from '../app/DataContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

function TabPanel(props) {
    const {children, value, index, ...other} = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    }
}

export default function YouTubeMain() {

    const {allDataLoaded, channelSet} = useContext(LoadingContext)
    const {visibleChannels} = useContext(DataContext)

    const sets = ['new', 'featured', 'full']
    let initialIndex = sets.indexOf(channelSet)

    const theme = useTheme()
    const [value, setValue] = React.useState(initialIndex)

    const navigate = useNavigate()

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue)
        const routes = ['/new', '/featured', '/full']
        navigate(routes[newValue])
    }, [navigate])

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    const tabPadding = smallWindow ? 20 : 12

    const newName = smallWindow ? 'New' : 'New & Noteworthy'
    const featuredName = smallWindow ? 'Featured' : 'Featured Channels'
    const fullName = smallWindow ? 'Full List' : 'Full Directory'

    return (
        <Box style={{backgroundColor: '#2a2a2a', width: '100%', paddingTop: tabPadding}}>
            <AppBar position='static'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='secondary'
                    textColor='inherit'
                    aria-label='full width tabs example'
                    style={{}}
                    selectionFollowsFocus
                    centered
                >
                    <Tab label={newName}{...a11yProps(0)} style={{margin: '0px 5px'}}/>
                    <Tab label={featuredName} {...a11yProps(1)} style={{margin: '0px 5px'}}/>
                    <Tab label={fullName} {...a11yProps(2)} style={{margin: '0px 5px'}}/>
                </Tabs>
            </AppBar>
            <div style={{padding: '0', backgroundColor: '#ccc'}}>
                <TabPanel value={value} index={0} dir={theme.direction} style={{padding: 0}}>
                    <React.Fragment>

                        {!(allDataLoaded && visibleChannels) &&
                            <LoadingDisplay/>
                        }
                        {(allDataLoaded && visibleChannels) &&
                            <Channels channels={visibleChannels}/>
                        }

                    </React.Fragment>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} style={{padding: 0}}>
                    {!(allDataLoaded && visibleChannels) &&
                        <LoadingDisplay/>
                    }
                    {(allDataLoaded && visibleChannels) &&
                        <Channels channels={visibleChannels}/>
                    }
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} style={{padding: 0}}>
                    {!(allDataLoaded && visibleChannels) &&
                        <LoadingDisplay/>
                    }
                    {(allDataLoaded && visibleChannels) &&
                        <Channels channels={visibleChannels}/>
                    }
                </TabPanel>
            </div>
        </Box>
    )
}
