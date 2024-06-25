import React from 'react'
import Button from '@mui/material/Button'
import {Popover} from '@mui/material'

function MainVideoPlayed30Button({played30}) {

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <React.Fragment>
            <Button onClick={handleClick} style={{minWidth:30}}>
                <div style={{color: played30 ? '#49c725' : '#777'}}>:30</div>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div style={{width:230, margin:20, fontSize:'.85rem'}}>
                    YouTube only counts views if you watch more than 30 seconds of a video.
                    Help out creators by watching for a little while. <b>Thanks!</b>
                </div>
            </Popover>
        </React.Fragment>
    )
}

export default MainVideoPlayed30Button
