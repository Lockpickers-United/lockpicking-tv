import * as React from 'react'
import {useCallback, useContext} from 'react'

import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import DataContext from '../app/DataContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import FilterContext from '../context/FilterContext.jsx'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import dayjs from 'dayjs'
import Nav from '../nav/Nav.jsx'
import SortButton from '../filters/SortButton.jsx'
import {channelTableSortFields} from '../data/sortFields'
import {openInNewTab} from '../util/openInNewTab'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Blank24x24 from '../assets/Blank24x24.jsx'

export default function ChannelsTableMain() {

    const {allDataLoaded, getChannelFromId} = useContext(LoadingContext)
    const {visibleChannels} = useContext(DataContext)

    console.log(visibleChannels)

    const mappedChannels = allDataLoaded
        ? visibleChannels?.map(channel => {
            const fullChannel = getChannelFromId(channel.id)
            const link = channel.customUrl
                ? `https://www.youtube.com/${channel.customUrl}`
                : `https://www.youtube.com/channel/${channel.id}`
            return {
                ...channel,
                featuredChannel: fullChannel.channelFlags.includes('featured') ? 'F' : '',
                newChannel: fullChannel.channelFlags.includes('new') ? 'N' : '',
                playlistChannel: fullChannel.channelFlags.includes('playlist') ? 'P' : '',
                subscribedChannel: fullChannel.channelFlags.includes('subscription') ? 'S' : '',
                link: link
            }
        })
        : []


    const {filters, addFilter} = useContext(FilterContext)
    const {sort} = filters

    //     const addFilter = useCallback((keyToAdd, valueToAdd, replace) => {

    const handleSort = useCallback((field, reverse) => {
        const sortValue = sort === field
            ? field + reverse
            : field
        addFilter('sort', sortValue, true)
    }, [addFilter, sort])

    const channelIcon = sort === 'name'
        ? <ArrowDropUpIcon/>
        : sort === 'nameDesc'
            ? <ArrowDropDownIcon/>
            : <Blank24x24/>

    const videosIcon = sort === 'videos'
        ? <ArrowDropDownIcon/>
        : sort === 'videosAsc'
            ? <ArrowDropUpIcon/>
            : <Blank24x24/>

    const viewsIcon = sort === 'views'
        ? <ArrowDropDownIcon/>
        : sort === 'viewsAsc'
            ? <ArrowDropUpIcon/>
            : <Blank24x24/>

    const subscribersIcon = sort === 'subscribers'
        ? <ArrowDropDownIcon/>
        : sort === 'subscribersAsc'
            ? <ArrowDropUpIcon/>
            : <Blank24x24/>

    function abbreviate(number) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1,
            notation: 'compact',
            compactDisplay: 'short'
        }).format(number)
    }

    document.title = 'lockpicking.tv - Channels'

    const {width} = useWindowSize()
    const smallWindow = width <= 800
    const pagePadding = !smallWindow
        ? '20px 24px 32px 24px'
        : '12px 4px 32px 4px'

    const whiteSpace = smallWindow ? 'inherit' : 'nowrap'

    const headerStyle = !smallWindow
        ? {textAlign: 'left', fontSize: '1rem', lineHeight: '1.1rem', padding: '8px 0px 8px 0px'}
        : {textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.1rem', padding: '8px 0px 8px 0px'}
    const cellStyle = !smallWindow
        ? {textAlign: 'left', fontSize: '0.9rem', whiteSpace: whiteSpace, padding: '8px 8px 8px 26px', border: 0}
        : {textAlign: 'left', fontSize: '0.87rem', whiteSpace: whiteSpace, padding: '8px 8px 8px 8px', border: 0}
    const showDetails = false

    const extras = null

    return (
        <React.Fragment>
            <Nav title='YouTube Directory' route='channels' extras={extras} noMenu={true}/>

            {(!allDataLoaded) &&
                <div style={{marginTop: 30}}>
                    <LoadingDisplay/>
                </div>
            }

            {(allDataLoaded) &&

                <div style={{
                    minWidth: '320px', height: '100%',
                    padding: pagePadding,
                    marginLeft: 'auto', marginRight: 'auto', marginTop: 0
                }}>

                    <div style={{maxWidth: 800, marginLeft: 'auto', marginRight: 'auto'}}>

                        <TableContainer id='channelsTable'
                                        style={{
                                            padding: '0px 4px 0px 4px',
                                            width: '100%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            marginTop: 0
                                        }}
                                        component={Paper} elevation={3}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow sx={{'& .MuiButton-startIcon': {
                                            margin:0,
                                            width:'18px'
                                        }, }}>
                                        <TableCell sx={{...headerStyle, textAlign: 'left'}} component='th' scope='row'>
                                            <Button variant='text' startIcon={channelIcon} size='small'
                                                    onClick={() => {
                                                        handleSort('name', 'Desc')
                                                    }}
                                            >
                                                Channel
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <Button variant='text' startIcon={videosIcon} size='small'
                                                    onClick={() => {
                                                        handleSort('videos', 'Asc')
                                                    }}
                                            style={{padding:0}}>
                                                Videos
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <Button variant='text' startIcon={viewsIcon} size='small'
                                                    onClick={() => {
                                                        handleSort('views', 'Asc')
                                                    }}
                                                    style={{padding:0}}>
                                            Views
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <Button variant='text' startIcon={subscribersIcon} size='small'
                                                    onClick={() => {
                                                        handleSort('subscribers', 'Asc')
                                                    }}
                                                    style={{padding:0}}>
                                                Subscr.
                                            </Button>
                                        </TableCell>

                                        {showDetails &&
                                            <React.Fragment>
                                                <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                           scope='row'>
                                                    Launched
                                                </TableCell>

                                                <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                           scope='row'>
                                                    New
                                                </TableCell>
                                                <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                           scope='row'>
                                                    Feat.
                                                </TableCell>
                                                <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                           scope='row'>
                                                    Subscr.
                                                </TableCell>
                                            </React.Fragment>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {mappedChannels.map((channel, index) =>
                                        <TableRow key={index} index={index}
                                                  sx={{
                                                      '&:nth-of-type(even) td, &:nth-of-type(even) th': {backgroundColor: '#eee'},
                                                      'td, th': {}
                                                  }}>

                                            <TableCell sx={{...cellStyle, textAlign: 'left', paddingLeft:'24px'}} component='th'
                                                       scope='row'>
                                                <a onClick={() => {
                                                    openInNewTab(channel.link)
                                                }} style={{color: '#3d70a5', fontWeight: 500}}>
                                                    {channel.title}
                                                </a>

                                            </TableCell>
                                            <TableCell sx={{...cellStyle, textAlign: 'center'}} component='th'
                                                       scope='row'>
                                                {abbreviate(channel.videoCount)}
                                            </TableCell>
                                            <TableCell sx={{...cellStyle, textAlign: 'center'}} component='th'
                                                       scope='row'>
                                                {abbreviate(channel.viewCount)}
                                            </TableCell>
                                            <TableCell sx={{...cellStyle, textAlign: 'center'}} component='th'
                                                       scope='row'>
                                                {abbreviate(channel.subscriberCount)}
                                            </TableCell>

                                            {showDetails &&
                                                <React.Fragment>
                                                    <TableCell sx={{...cellStyle, textAlign: 'center'}} component='th'
                                                               scope='row'>
                                                        {dayjs(channel.publishedAt).format('MMM YYYY')}
                                                    </TableCell>

                                                    <TableCell sx={{...cellStyle, textAlign: 'center', fontWeight: 600}}
                                                               component='th'
                                                               scope='row'>
                                                        {channel.newChannel}
                                                    </TableCell>
                                                    <TableCell sx={{...cellStyle, textAlign: 'center', fontWeight: 600}}
                                                               component='th'
                                                               scope='row'>
                                                        {channel.featuredChannel}
                                                    </TableCell>
                                                    <TableCell sx={{...cellStyle, textAlign: 'center', fontWeight: 600}}
                                                               component='th'
                                                               scope='row'>
                                                        {channel.subscribedChannel}
                                                    </TableCell>
                                                </React.Fragment>
                                            }
                                        </TableRow>
                                    )}

                                    <TableRow><TableCell></TableCell></TableRow>

                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
