import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player/youtube'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'

import queryString from 'query-string'
import useWindowSize from '../util/useWindowSize.jsx'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import VideoStats from './VideoStats.jsx'

const VideoCard = ({video, expanded, onExpand}) => {

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback(() => {
        onExpand(!expanded ? video.id : false)
    }, [video.id, expanded, onExpand])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === video.id

            setScrolled(true)

            setTimeout(() => {
                window.scrollTo({
                    left: 0,
                    top: ref.current.offsetTop - offset * 2,
                    behavior: isIdFiltered ? 'auto' : 'smooth'
                })
            }, isIdFiltered ? 0 : 100)
        } else if (!expanded) {
            setScrolled(false)
        }
    }, [expanded, scrolled, video.id])

    const {getChannelFromId} = useContext(LoadingContext)
    const channel = getChannelFromId(video.channelId)

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 40 : 60
    const avatarMargin = smallWindow ? '0px 10px 0px 0px' : '0px 10px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'left'

    const channelLink = `https://www.youtube.com/channel/${channel.id}`
    const titleLink = `https://www.youtube.com/watch?v=${video.id}`

    const textColor = '#fff'

    const videoUrl = `https://www.youtube.com/embed/${video.id}`

    return (
        <Card style={{backgroundColor: '#1A2027', boxShadow: 'unset', padding: '0px', color: textColor}} ref={ref}>
            <CardContent style={{padding: '5px 0px 5px 0px', textAlign: 'center'}}>
                <div style={{width: '100%', height: 220}}>
                    <ReactPlayer
                        url={videoUrl}
                        width='100%'
                        height='100%'
                        light
                        playing={expanded}
                        muted={false}
                        onReady={handleChange}
                        controls
                    />
                </div>

                <div style={headerFlexStyle}>
                    <div style={{height: avatarSize, margin: avatarMargin}}>
                        <a href={channelLink} target='_blank' rel='noopener noreferrer'
                           style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                            <img src={channel.thumbnail} alt='icon' height={avatarSize} width={avatarSize}
                                 style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                        </a>
                    </div>
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3rem',
                        fontWeight: 600,
                        textAlign: nameAlign,
                        flexGrow: 1
                    }}>
                        <div style={{fontSize: '0.95rem', fontWeight: 400, marginBottom: 3}}>
                            <a href={channelLink} target='_blank' rel='noopener noreferrer'
                               style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                                {video.channelOwner}
                            </a>
                        </div>
                        <a href={titleLink} target='_blank' rel='noopener noreferrer'
                           style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                            {video.title}
                        </a>
                    </div>
                </div>
                <VideoStats video={video}/>
            </CardContent>
        </Card>
    )
}

export default VideoCard
