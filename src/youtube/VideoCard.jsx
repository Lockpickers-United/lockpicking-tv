import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player/youtube'
import LoadingContext from '../youtubeContext/LoadingContextYT.jsx'

import queryString from 'query-string'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'

import {styled} from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

import VideoStats from './VideoStats.jsx'

const ExpandMore = styled((props) => {
    const {expand, ...other} = props
    return <IconButton {...other} />
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))


const Channel = ({video, expanded, onExpand}) => {

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
    const avatarMargin = smallWindow ? '0px 15px 0px 0px' : '0px 0px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'center'
    const link = channel.customUrl
        ? `https://www.youtube.com/${channel.customUrl}`
        : `https://www.youtube.com/channel/${channel.id}`

    const textColor = '#fff'

    return (
        <Card style={{backgroundColor: '#24244a', boxShadow: 'unset', padding: '0px', color: textColor}} ref={ref}>
            <CardContent style={{padding: '5px 0px 0px 0px', textAlign: 'center'}}>
                <b>Featured Video</b>
                <div style={{width:'100%', height:220}}>
                    <ReactPlayer
                        url='https://www.youtube.com/embed/2kbYTGa_O3c'
                        foo='https://i.ytimg.com/vi/2kbYTGa_O3c/mqdefault.jpg'
                        width='100%'
                        height='100%'
                        light
                        playing
                        muted
                    />
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
                            {video.title}
                        </a>
                    </div>
                    <div style={{}}>
                        <ExpandMore style={{height: 40}} onClick={handleChange}>
                            <ExpandMoreIcon style={{color: '#ddd'}}/>
                        </ExpandMore>
                    </div>
                </div>
            </CardContent>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent style={{textAlign: 'left', padding: 10, color: textColor}}>
                    <VideoStats video={video}/>
                </CardContent>
            </Collapse>


        </Card>
    )
}

export default Channel
