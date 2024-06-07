import React, {useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import VideoStats from './VideoStats.jsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const VideoCard = ({video, handlePlaylistClick, index, playing, listType}) => {

    const {getChannelFromId, getPlaylistVideoFromId} = useContext(LoadingContext)
    const channel = getChannelFromId(video?.channelId)
    const fullVideo = getPlaylistVideoFromId(video?.id)
    //console.log(fullVideo)

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 35 : 40
    const avatarMargin = smallWindow ? '3px 15px 0px 0px' : '3px 15px 5px 0px'

    const channelLink = `https://www.youtube.com/channel/${channel.id}`
    const backgroundColor = playing === video.id ? '#374ca2' : '#1A2027'
    const textColor = '#fff'

    dayjs.extend(relativeTime)
    const videoAgeString = fullVideo? dayjs().to(dayjs(fullVideo.publishedAt)) : dayjs().to(dayjs(video.publishedAt))
    //const videoAgeString = dayjs().to(dayjs('2024-06-05T16:00:20Z'))
    const videoAge = videoAgeString.replace(/^(an|a)/, '1')

    return (
        <Card style={{backgroundColor: '#1A2027', boxShadow: 'unset', padding: '0px', color: textColor}}>
            <CardContent style={{padding: '5px 0px 5px 0px', textAlign: 'center'}}>
                <div style={{display: 'flex', padding: 10}}>
                    {listType === 'videos' &&
                        <div style={{height: avatarSize, margin: avatarMargin}}>
                            <a href={channelLink} target='_blank' rel='noopener noreferrer'
                               style={{color: '#fff', textDecoration: 'none'}}>
                                <img
                                    src={channel.snippet.thumbnails.default.url} alt='icon' height={avatarSize}
                                    width={avatarSize}
                                    style={{
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        fontSize: '.7rem',
                                        minWidth: avatarSize
                                    }}/>
                            </a>
                        </div>
                    }
                    {listType === 'playlist' &&
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
                                alignContent: 'center',
                                backgroundColor: backgroundColor
                            }}>
                                {index + 1}
                            </div>
                        </a>
                    }
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
                                {videoAge}, by <b>{video.channelOwner}</b>
                            </a>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', marginLeft: 10}}>

                    <div style={{
                        flexGrow: 1,
                        backgroundImage: `url(${video.thumbnail})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height: 130
                    }} onClick={() => {
                        handlePlaylistClick(video, index)
                    }}>
                    </div>
                    <div style={{margin: '0px 10px'}}><VideoStats video={video} vertical={true}/></div>
                </div>
            </CardContent>
        </Card>
    )
}

export default VideoCard
