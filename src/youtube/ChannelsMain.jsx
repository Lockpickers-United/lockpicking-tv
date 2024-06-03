import * as React from 'react'
import PropTypes from 'prop-types'
import {useTheme} from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {useNavigate} from 'react-router-dom'
import {useCallback, useContext} from 'react'

import Channels from './Channels.jsx'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import DataContext from '../app/DataContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import Tracker from '../app/Tracker.jsx'

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

export default function ChannelsMain() {

    const {allDataLoaded, channelSet} = useContext(LoadingContext)
    const {visibleChannels} = useContext(DataContext)
    const navigate = useNavigate()

    const sets = ['featured', 'new', 'full']
    let initialIndex = sets.indexOf(channelSet)


    const theme = useTheme()
    const [value, setValue] = React.useState(initialIndex)

    if (value !== sets.indexOf(channelSet)) {
        setValue(sets.indexOf(channelSet))
    }

    const titleNames = ['Featured Channels', 'New & Noteworthy', 'Full Directory']
    document.title = 'lockpicking.tv - ' + titleNames[value]

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue)
        const routes = ['/featured', '/new', '/full']
        navigate(routes[newValue])
    }, [navigate])

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    const tabPadding = smallWindow ? 7 : 4

    const newName = smallWindow ? 'New' : 'New & Noteworthy'
    const featuredName = smallWindow ? 'Featured' : 'Featured Channels'
    const fullName = smallWindow ? 'Full List' : 'Full Directory'

    return (
        <div style={{backgroundColor: '#2a2a2a', width: '100%', paddingTop: tabPadding}}>
            <div>
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
                    <Tab label={featuredName} {...a11yProps(0)} style={{margin: '0px 5px'}}/>
                    <Tab label={newName}{...a11yProps(1)} style={{margin: '0px 5px'}}/>
                    <Tab label={fullName} {...a11yProps(2)} style={{margin: '0px 5px'}}/>
                </Tabs>
            </div>
            <div style={{padding: '0', backgroundColor: '#ccc'}}>
                <TabPanel value={value} index={0} dir={theme.direction} style={{padding: 0}}>
                    <React.Fragment>
                        {!(allDataLoaded && visibleChannels) &&
                            <LoadingDisplay/>
                        }
                        {(allDataLoaded && visibleChannels) &&
                            <Channels channels={visibleChannels}/>
                        }
                        <Tracker feature='page' name={'featured'}/>
                    </React.Fragment>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction} style={{padding: 0}}>
                    {!(allDataLoaded && visibleChannels) &&
                        <LoadingDisplay/>
                    }
                    {(allDataLoaded && visibleChannels) &&
                        <Channels channels={visibleChannels}/>
                    }
                    <Tracker feature='page' name={'new'}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} style={{padding: 0}}>
                    {!(allDataLoaded && visibleChannels) &&
                        <LoadingDisplay/>
                    }
                    {(allDataLoaded && visibleChannels) &&
                        <Channels channels={visibleChannels}/>
                    }
                    <Tracker feature='page' name={'full'}/>
                </TabPanel>
            </div>
        </div>
    )
}
