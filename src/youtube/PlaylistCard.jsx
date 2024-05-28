import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player/youtube'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'

import queryString from 'query-string'
import useWindowSize from '../util/useWindowSize.jsx'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const PlaylistCard = ({playlist, expanded, onExpand}) => {

    console.log('playlist',playlist)


    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback(() => {
        onExpand(!expanded ? playlist.id : false)
    }, [playlist.id, expanded, onExpand])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === playlist.id

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
    }, [expanded, scrolled, playlist.id])


    const {getChannelFromId} = useContext(LoadingContext)
    const channel = getChannelFromId(playlist.channelId)

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 40 : 60
    const avatarMargin = smallWindow ? '0px 15px 0px 0px' : '0px 0px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'left'
    const link = `https://www.youtube.com/channel/${channel.id}`

    const textColor = '#fff'

    const videoUrl = `https://www.youtube.com/embed/${playlist.id}`

    return (
        <Card style={{backgroundColor: '#24244a', boxShadow: 'unset', padding: '0px', color: textColor}} ref={ref}>
            <CardContent style={{padding: '5px 0px 5px 0px', textAlign: 'center'}}>
                <div style={{width: '100%', height: 220}}>
                    <ReactPlayer
                        url={videoUrl}
                        width='100%'
                        height='100%'
                        light
                        playing={expanded}
                        muted
                        onReady={handleChange}
                    />

                    <iframe width='560' height='315'
                            src='https://www.youtube.com/embed/videoseries?si=CBhmWNga0yQpuQc7&amp;list=PL66CD42F86F3A1F85'
                            title='YouTube video player' frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            referrerPolicy='strict-origin-when-cross-origin' allowFullScreen>
                    </iframe>
                </div>

                <div style={headerFlexStyle}>
                    <div style={{height: avatarSize, margin: avatarMargin}}>
                        <img src={channel.thumbnail} alt='icon' height={avatarSize} width={avatarSize}
                             style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                    </div>
                    <div style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textAlign: nameAlign,
                        flexGrow: 1
                    }}>
                        <a href={link} target='_blank' rel='noopener noreferrer'
                           style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                            {playlist.title}
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlaylistCard
