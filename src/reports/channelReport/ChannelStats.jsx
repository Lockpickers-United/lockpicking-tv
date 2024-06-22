import React, {useCallback, useState} from 'react'
import {FormControl, InputLabel, Select} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import useWindowSize from '../../util/useWindowSize'
import IndividualChannelLine from './IndividualChannelLine.jsx'
import IndividualChannelLineShort from './IndividualChannelLineShort.jsx'
import IndividualChannelBar from './IndividualChannelBar.jsx' //eslint-disable-line
import IndividualChannelBarMuiX from './IndividualChannelBarMuiX.jsx' //eslint-disable-line

import dayjs from 'dayjs'

function Component({channelStats, channelTitles}) {

    //"UCHEPEHbo6kAxsxvIePE9kRw": "Lock Pickers United",
    // UCSUvMqYICfPDGplqsC34xCg  adam
    // UCEVjx1wx19nFC9_VmvahtGw Grain
    // UCjoYnHtoH9iJg_K9DlnMtMw NiXXeD

    const [channelId, setChannelId] = useState('UCjoYnHtoH9iJg_K9DlnMtMw')
    const channelIds = Object.keys(channelStats)
    channelIds.sort((a, b) => {
        return channelTitles[a].localeCompare(channelTitles[b])
    })
    const channelDataRaw = channelStats[channelId]

    const newLine = []
    const featuredLine = []
    const viewsLine = []
    const subscribersLine = []
    const videosLine = []
    Object.keys(channelDataRaw)
        .map(date => {
            const dateString = dayjs(date).format('MMM DD')
            viewsLine.push({x: dateString, y: channelDataRaw[date].dailyViews})
            subscribersLine.push({x: dateString, y: channelDataRaw[date].dailySubscribers})
            newLine.push({x: dateString, y: channelDataRaw[date].channelFlags.includes('new') ? 1 : 0})
            featuredLine.push({x: dateString, y: channelDataRaw[date].channelFlags.includes('featured') ? 2 : 0})
            videosLine.push({x: dateString, y: channelDataRaw[date].dailyVideos})
        })

    const channelData = {
        newLine: newLine,
        featuredLine: featuredLine,
        viewsLine: viewsLine,
        subscribersLine: subscribersLine,
        videosLine: videosLine

    }


    const channelKeys = {}
    Object.keys(channelStats).map(channelId => {
        const channelData = channelStats[channelId]
        const latest = Object.keys(channelData)
            .sort((a, b) => {
                return b.localeCompare(a)
            })
        const current = channelData[latest[0]]
        let channelKey = ''
        if (current.channelFlags.includes('new')) channelKey = channelKey + '*'
        if (current.channelFlags.includes('featured')) channelKey = channelKey + '**'
        channelKeys[channelId] = channelKey
    })

    const [open, setOpen] = useState(false)
    const handleClose = useCallback(() => setOpen(false), [])
    const handleOpen = useCallback(() => setOpen(true), [])

    const handleChange = useCallback(event => {
        setChannelId(event.target.value)
        handleClose()
    }, [handleClose])

    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const buttonMargin = !smallWindow ? 10 : 0

    return (
        <React.Fragment>
            <div style={{marginTop: 24, textAlign: 'center'}}>
                <FormControl id='brandPulldown' style={{marginBottom: buttonMargin, minWidth: 200, textAlign: 'left'}}>
                    <InputLabel>Channel</InputLabel>
                    <Select
                        id='brandSelect'
                        value={channelId}
                        label='Channel'
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChange}
                        style={{fontWeight: 700, color: '#eee'}}
                    >
                        {channelIds.map((id, index) =>
                            <MenuItem key={index} value={id}>{channelTitles[id]} {channelKeys[id]}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <div style={{fontSize: '0.8rem', marginBottom:10, color:'#ddd'}}>
                    * New &nbsp;&nbsp; ** Featured &nbsp;&nbsp; *** New & Featured
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <IndividualChannelLine channelData={channelData}/>
                <IndividualChannelLineShort channelData={channelData}/>
                {/*
                <IndividualChannelBar channelData={channelDataRaw}/>
                <IndividualChannelBarMuiX channelData={channelDataRaw}/>
                */}
            </div>
        </React.Fragment>
    )

}

export default Component
