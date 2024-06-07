import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import YouTubeIcon from '@mui/icons-material/YouTube'
import {openInNewTab} from '../util/openInNewTab'

function OpenYouTubeLinkButton({channel, video, fontSize}) {

    let title
    let link
    let icon = <OpenInNewIcon style={{color: '#fff'}} fontSize={fontSize}/>

    if (video) {
        title = 'View video on YouTube'
        link = `https://www.youtube.com/watch?v=${video.id}`
        icon = <YouTubeIcon style={{color: '#fff'}} fontSize={fontSize}/>
    }

    if (channel) {
        title = 'View channel on YouTube'
        link = channel.customUrl
            ? `https://www.youtube.com/${channel.customUrl}`
            : `https://www.youtube.com/channel/${channel.id}`
    }

    return (
        <React.Fragment>
            {link &&
                <Tooltip title={title} arrow disableFocusListener>
                    <IconButton onClick={() => {openInNewTab(link)}} style={{height: 40, width: 40}}>
                            {icon}
                    </IconButton>
                </Tooltip>
            }
        </React.Fragment>
    )
}

export default OpenYouTubeLinkButton
