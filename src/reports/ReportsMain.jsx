import React, {useContext} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import LoadingContext from '../context/LoadingContext.jsx'

import {DataGrid} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'

function ReportsMain() {

    function abbreviate(number) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1,
            notation: 'compact',
            compactDisplay: 'short'
        }).format(number)
    }

    const {allChannels} = useContext(LoadingContext)

    console.log(allChannels)

    const rows = allChannels.map(channel => {
        return {
            id: channel.channelId,
            kind: channel.kind,
            viewCount: parseInt(channel.statistics.viewCount),
            subscriberCount: parseInt(channel.statistics.subscriberCount),
            videoCount: parseInt(channel.statistics.videoCount),
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.default.url,
            customUrl: channel.snippet.customUrl,
            publishedAt: channel.snippet.publishedAt,
            latestVideo: channel.latestVideo,
            channelSet: channel.channelSet,
            featuredChannel: channel.channelFlags.includes('featured') ? 'featured' : '',
            newChannel: channel.channelFlags.includes('new') ? 'new' : '',
            playlistChannel: channel.channelFlags.includes('playlist') ? 'playlist' : '',
            subscribedChannel: channel.channelFlags.includes('subscription') ? 'subscription' : ''
        }
    }).sort(function (a, b) {
        return a.title.localeCompare(b.title)
    })

    const columns = [
        {
            field: 'title',
            headerName: 'Channel',
            width: 150,
            editable: false
        },
        {
            field: 'subscribedChannel',
            headerName: 'Subscribed',
            width: 100,
            editable: false,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'featuredChannel',
            headerName: 'Featured',
            width: 90,
            editable: false,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'newChannel',
            headerName: 'New',
            width: 60,
            editable: false,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'playlistChannel',
            headerName: 'Playlist',
            width: 90,
            editable: false,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'videoCount',
            headerName: 'Videos',
            width: 100,
            editable: false,
            align: 'center',
            headerAlign: 'center'
            ,
            valueFormatter: (value) => value.toLocaleString()
        },
        {
            field: 'viewCount',
            headerName: 'Views',
            width: 100,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (value) => abbreviate(parseInt(value))
        },
        {
            field: 'subscriberCount',
            headerName: 'Subscribers',
            width: 100,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (value) => abbreviate(parseInt(value))
        },
        {
            field: 'latestVideo',
            headerName: 'Latest Video',
            width: 110,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (value) => dayjs(value).format('MM/DD/YY')
        },
        {
            field: 'publishedAt',
            headerName: 'Launched',
            width: 110,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (value) => dayjs(value).format('MM/DD/YY')
        }
    ]

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 1200, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>


            <Box sx={{width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 50
                            }
                        }
                    }}
                    pageSizeOptions={[50, 100]}
                    density={'compact'}
                    disableRowSelectionOnClick
                    ignoreDiacritics
                    sx={{fontSize: '.9rem'}}
                />
            </Box>
        </div>
    )
}

export default ReportsMain
