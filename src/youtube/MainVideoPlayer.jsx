import React, {useCallback, useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import ReactPlayer from 'react-player/youtube'
import VideoStats from './VideoStats.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import Tracker from '../app/Tracker.jsx'
import {openInNewTab} from '../util/openInNewTab'
import Button from '@mui/material/Button'

const MainVideoPlayer = ({video, expanded, setExpanded}) => {

    if (!video) {
        return null
    }

    const {getChannelFromId} = useContext(LoadingContext)
    const channel = getChannelFromId(video?.channelId)

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

    const handleChange = useCallback(() => {
        setExpanded(!expanded)
    }, [expanded, setExpanded])

    const {width} = useWindowSize()
    const widths = [440, 600, 800, 1200, 9999]
    const widthIndex = widths.indexOf(widths.find(option => {
        return option >= width
    }))
    const videoSizes = [[220, 440], [247, 440], [337, 600], [450, 800], [450, 800]]

    const smallWindow = width <= 600
    const avatarSize = smallWindow ? 50 : 50
    const avatarMargin = smallWindow ? '0px 10px 0px 0px' : '0px 10px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'left'

    const channelLink = `https://www.youtube.com/channel/${channel.id}`
    const titleLink = `https://www.youtube.com/watch?v=${video.id}`

    const textColor = '#fff'

    const videoUrl = `https://www.youtube.com/embed/${video.id}`

    const buttonText = expanded ? 'hide video player' : 'show video player'

    return (
        <React.Fragment>
            <Card id='mainPlayer' style={{
                backgroundColor: '#29323f',
                padding: '0px',
                color: textColor,
                position: 'fixed',
                width: '100%',
                borderRadius: 0
            }}>
                <CardContent style={{padding: '8px 0px 5px 0px', textAlign: 'center'}} id='playerCard'>
                    <div style={{width: '100%', display: 'flex', placeItems: 'center'}}>
                        <Button onClick={handleChange} variant='filled' startIcon={<PlayCircleOutlineIcon />} size='small'>
                            {buttonText}
                        </Button>
                        <ExpandMore style={{height: 40}} onClick={handleChange} expand={expanded}>
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </div>
                </CardContent>
                <Collapse in={expanded} timeout='auto' id='collapse' unmountOnExit>
                    <div style={{
                        height: videoSizes[widthIndex][0],
                        maxWidth: videoSizes[widthIndex][1],
                        marginRight: 'auto', marginLeft: 'auto'
                    }}>
                        <ReactPlayer
                            url={videoUrl}
                            width='100%'
                            height='100%'
                            light={true}
                            muted={false}
                            controls
                        />
                    </div>
                    <div style={headerFlexStyle}>
                        <div style={{
                            borderRadius: '50%',
                            height: avatarSize,
                            width: avatarSize,
                            minWidth: avatarSize,
                            margin: avatarMargin,
                            verticalAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <a href={channelLink} target='_blank' rel='noopener noreferrer'
                               style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                                <img src={channel.snippet.thumbnails.default.url} alt='icon' height={avatarSize}
                                     width={avatarSize}
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
                            <a onClick={() => {openInNewTab(titleLink)}}
                               style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                                {video.title}
                            </a>
                            <div style={{marginTop: 3}}>
                                <a onClick={() => {openInNewTab(channelLink)}}
                                   style={{
                                       color: textColor,
                                       textDecoration: 'none',
                                       fontSize: '0.9rem',
                                       fontWeight: 400
                                   }}>
                                    By: {video.channelOwner}
                                </a>
                            </div>
                        </div>
                    </div>
                    <CardContent style={{textAlign: 'left', padding: '0px 0px 10px 0px', color: '#fff'}}
                                 id='videoStats'>
                        <VideoStats video={video}/>
                    </CardContent>
                </Collapse>
            </Card>
            <div id='cardEnd'/>
            <Tracker feature='videoPlayer' page={video.title} videoId={video.id}/>

        </React.Fragment>
    )
}

export default MainVideoPlayer
