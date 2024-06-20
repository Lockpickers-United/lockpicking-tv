import React, {useCallback, useState} from 'react'
import {FormControl, InputLabel, Select} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import useWindowSize from '../../util/useWindowSize'
import IndividualChannelLine from './IndividualChannelLine.jsx'

function Component({channelStats,channelTitles}) {

    //"UCHEPEHbo6kAxsxvIePE9kRw": "Lock Pickers United",
    // UCSUvMqYICfPDGplqsC34xCg  adam

    const [channelId, setChannelId] = useState('UCHEPEHbo6kAxsxvIePE9kRw')
    const channelIds = Object.keys(channelTitles)
    channelIds.sort((a,b) => {
            return channelTitles[a].localeCompare(channelTitles[b])
        })

    const channelData = channelStats[channelId]

    const [open, setOpen] = useState(false)
    const handleClose = useCallback(() => setOpen(false), [])
    const handleOpen = useCallback(() => setOpen(true), [])

    const handleChange = useCallback(event => {
        setChannelId(event.target.value)
        handleClose()
    },[handleClose])

    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const buttonMargin = !smallWindow ? 20 : 10

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
                           <MenuItem key={index} value={id}>{channelTitles[id]}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>
            <div style={{textAlign: 'center'}}>
                        <IndividualChannelLine channelData={channelData}/>
            </div>
        </React.Fragment>
    )

}

export default Component
