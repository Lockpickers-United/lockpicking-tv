import React, {useContext} from 'react'
import LoadingContext from '../../context/LoadingContext.jsx'
import {DataGrid} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import dayjs from 'dayjs'



function ChannelDataGrid() {


    function abbreviate(number) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1,
            notation: 'compact',
            compactDisplay: 'short'
        }).format(number)
    }

    const {fullDirectoryChannels} = useContext(LoadingContext)

    const rows = fullDirectoryChannels.map(channel => {
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

    return (
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
    )
}

export default ChannelDataGrid
