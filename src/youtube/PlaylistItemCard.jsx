import React, {useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'

const PlaylistItemCard = ({video, handlePlaylistClick, index, playing}) => {

    const backgroundColor = playing === video.id ? '#374ca2' : '#1A2027'

    const {getChannelFromId} = useContext(LoadingContext)
    const channel = getChannelFromId(video.channelId)

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 35 : 40
    const avatarMargin = smallWindow ? '3px 15px 0px 0px' : '3px 15px 5px 0px'

    const channelLink = `https://www.youtube.com/channel/${channel.id}`
    const textColor = '#fff'

    return (
        <Card style={{backgroundColor: '#1A2027', boxShadow: 'unset', padding: '0px', color: textColor}}>
            <CardContent style={{padding: '5px 0px 5px 0px', textAlign: 'center'}}>
                <div style={{display: 'flex', padding: 10}}>
                    <a onClick={() => {
                        handlePlaylistClick(video, index)
                    }} style={{color: textColor, textDecoration: 'none', cursor: 'pointer', fontSize: '1.1rem'}}>
                        <div style={{
                            borderRadius: '50%',
                            border: '2px solid #ddd',
                            height: avatarSize,
                            width: avatarSize,
                            minWidth: avatarSize,
                            margin: avatarMargin,
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: backgroundColor
                        }}>
                            {index + 1}
                        </div>
                    </a>
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        flexGrow: 1
                    }}>
                        <a onClick={() => {
                            handlePlaylistClick(video, index)
                        }} style={{color: textColor, textDecoration: 'none', cursor: 'pointer', fontSize: '1.0rem'}}>
                            {video.title}
                        </a>
                        <div style={{marginTop: 3}}>
                            <a href={channelLink} target='_blank' rel='noopener noreferrer'
                               style={{color: textColor, textDecoration: 'none', fontSize: '0.83rem', fontWeight: 400}}>
                                By: {video.channelOwner}
                            </a>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlaylistItemCard
