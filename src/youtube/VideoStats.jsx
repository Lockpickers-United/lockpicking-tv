import FieldValue from '../util/FieldValue.jsx'
import Typography from '@mui/material/Typography'
import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

const VideoStats = ({video, vertical}) => {

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const statMargin = smallWindow ? 0 : 0
    const flexStyle = vertical ? {marginTop: 0} : {display: 'flex', marginTop: 0}

    const textStyle = vertical
        ? {fontSize: '0.9rem', lineHeight: 1.1}
        : {fontSize: '0.95rem', lineHeight: 1.25}

    function abbreviate(number) {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1,
            notation: 'compact',
            compactDisplay: 'short'
        }).format(number)
    }

    if (!video) {
        return null
    }
    return (
        <div style={{...flexStyle, width: '100%', textAlign: 'center'}}>
            {video.viewCount &&
                <FieldValue
                    name='views'
                    value={<Typography style={textStyle}>{abbreviate(video.viewCount)}</Typography>}
                    headerStyle={{color: '#bbb'}}
                    textStyle={{color: '#eee'}}
                    style={{marginRight: statMargin, flexGrow: 1}}
                />
            }
            {video.likeCount &&
                <FieldValue
                    name='likes'
                    value={<Typography style={textStyle}>{abbreviate(video.likeCount)}</Typography>}
                    headerStyle={{color: '#bbb'}}
                    textStyle={{color: '#eee'}}
                    style={{marginRight: statMargin, flexGrow: 1}}
                />
            }
            {video.commentCount &&
                <FieldValue
                    name='comments'
                    value={<Typography style={textStyle}>{abbreviate(video.commentCount)}</Typography>}
                    headerStyle={{color: '#bbb'}}
                    textStyle={{color: '#eee'}}
                    style={{marginRight: 0, flexGrow: 1}}
                />
            }
        </div>
    )

}

export default VideoStats