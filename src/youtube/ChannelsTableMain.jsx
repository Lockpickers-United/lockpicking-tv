import * as React from 'react'
import {useCallback, useContext} from 'react'

import DataContext from '../app/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import LoadingContext from '../youtubeContext/LoadingProvider.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import Nav from '../nav/Nav.jsx'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableHeaderButton from './TableHeaderButton.jsx'
import TableRow from '@mui/material/TableRow'
import useWindowSize from '../util/useWindowSize.jsx'
import {openInNewTab} from '../util/openInNewTab'

export default function ChannelsTableMain() {

    const {allDataLoaded, getChannelFromId} = useContext(LoadingContext)
    const {visibleChannels} = useContext(DataContext)

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
                link: link,
                name: channel.title
            }
        })
        : []

    const {filters, addFilter} = useContext(FilterContext)
    const {sort} = filters

    const handleSort = useCallback((field, reverse) => {
        const sortValue = sort === field
            ? field + reverse
            : field
        addFilter('sort', sortValue, true)
    }, [addFilter, sort])

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
        : {textAlign: 'left', fontSize: '0.8rem', lineHeight: '1.1rem', padding: '8px 0px 8px 0px'}
    const cellStyle = !smallWindow
        ? {textAlign: 'left', fontSize: '0.9rem', whiteSpace: whiteSpace, padding: '6px 8px 6px 26px', border: 0}
        : {textAlign: 'left', fontSize: '0.83rem', whiteSpace: whiteSpace, padding: '6px 2px 6px 8px', border: 0}


    const extras = null

    if (!allDataLoaded || !visibleChannels) {
        return (
            <div style={{marginTop: 30}}>
                <LoadingDisplay/>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Nav title='YouTube Directory' route='channels' extras={extras} noMenu={true}/>
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
                                            <TableHeaderButton handleSort={handleSort} column='name' reverse='Desc' sort={sort}/>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <TableHeaderButton handleSort={handleSort} column='videos' reverse='Asc' sort={sort}/>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <TableHeaderButton handleSort={handleSort} column='views' reverse='Asc' sort={sort}/>
                                        </TableCell>
                                        <TableCell sx={{...headerStyle, textAlign: 'center'}} component='th'
                                                   scope='row'>
                                            <TableHeaderButton handleSort={handleSort} column='subscribers' reverse='Asc' sort={sort}/>
                                        </TableCell>

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
                                                    {channel.name}
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
                                        </TableRow>
                                    )}

                                    <TableRow><TableCell></TableCell></TableRow>

                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
        </React.Fragment>
    )
}
