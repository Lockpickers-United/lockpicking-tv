import React, {Component, useCallback, useContext} from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingContext from '../context/LoadingContext.jsx'
import ReactPlayer from 'react-player/youtube'
import VideoStats from './VideoStats.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {openInNewTab} from '../util/openInNewTab'
import Button from '@mui/material/Button'

const MainVideoPlayer = ({video, expanded, setExpanded}) => {

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

    const randomStuff = (Math.random()).toString(36).substring(2, 10)
    const handlePlay = useCallback(() => {
        console.log('handlePlay')
        document.getElementById('trackImage').src = `/i/lptv.gif?trk=videoPlayer&videoId=${video.id}&r=${randomStuff}&w=${screen.width}&ref=${document.location}`
    }, [randomStuff, video.id])

    const handlePlayed30 = useCallback(() => {
        console.log('handlePlayed30')
        document.getElementById('trackImage').src = `/i/played30.gif?trk=played30&videoId=${video.id}&r=${randomStuff}&w=${screen.width}&ref=${document.location}`
    }, [randomStuff, video.id])

    const handlePlayed60 = useCallback(() => {
        console.log('handlePlayed60')
        document.getElementById('trackImage').src = `/i/played30.gif?trk=played60&videoId=${video.id}&r=${randomStuff}&w=${screen.width}&ref=${document.location}`
    }, [randomStuff, video.id])

    const {width} = useWindowSize()
    const widths = [440, 600, 800, 1200, 9999]
    const widthIndex = widths.indexOf(widths.find(option => {
        return option >= width
    }))
    const videoSizes = [[220, 440], [247, 440], [337, 600], [450, 800], [450, 800]]

    const smallWindow = width <= 600
    const avatarSize = smallWindow ? 50 : 50
    const avatarMargin = smallWindow ? '0px 10px 0px 0px' : '0px 10px 5px 0px'
    const nameAlign = smallWindow ? 'left' : 'left'
    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}

    const channelLink = `https://www.youtube.com/channel/${channel?.id}`
    const titleLink = `https://www.youtube.com/watch?v=${video.id}`
    const videoUrl = `https://www.youtube.com/embed/${video.id}`
    const buttonText = expanded ? 'hide video player' : 'show video player'
    const textColor = '#fff'

    class Player extends Component {

        state = {
            url: videoUrl,
            pip: false,
            playing: false,
            controls: true,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            played30: false,
            played60: false
        }

        load = url => {
            this.setState({
                url,
                played: 0,
                loaded: 0,
                pip: false,
                played30: false,
                played60: false
            })
        }

        handleStart = () => {
            //console.log('onStart')
            handlePlay()
            this.setState({played30: false})
            this.setState({played60: false})
        }

        handleOnPlaybackRateChange = (speed) => {
            this.setState({playbackRate: parseFloat(speed)})
        }

        handlePlay = () => {
            //console.log('onPlay', this.state)
            this.setState({playing: true})

        }

        handlePause = () => {
            //console.log('onPause')
            this.setState({playing: false})
        }

        handleProgress = ((state) => {

            if (state.playedSeconds > 30 && !this.state.played30) {
                handlePlayed30()
                this.setState({played30: true})
            }
            if (state.playedSeconds > 60 && !this.state.played60) {
                handlePlayed60()
                this.setState({played60: true})
            }
            // We only want to update time slider if we are not currently seeking
            if (!this.state.seeking) {
                this.setState(state)
            }
        })

        handleEnded = () => {
            console.log('onEnded')
            this.setState({playing: this.state.loop})
        }

        handleDuration = (duration) => {
            //console.log('onDuration', duration)
            this.setState({duration})
        }

        handleClickFullscreen = () => {
            //console.log('handleClickFullscreen')
            //screenfull.request(document.querySelector('.react-player'))
            //document.querySelector('.react-player').requestFullscreen()
        }

        ref = player => {
            this.player = player
        }

        render() {

            const {
                url,
                playing,
                controls,
                light,
                volume,
                muted,
                loop,
                playbackRate,
                pip
            } = this.state

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
                                <Button onClick={handleChange} variant='filled' startIcon={<PlayCircleOutlineIcon/>}
                                        size='small'>
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
                                    ref={this.ref}
                                    className='react-player'
                                    width='100%'
                                    height='100%'
                                    url={url}
                                    pip={pip}
                                    playing={playing}
                                    controls={controls}
                                    light={light}
                                    loop={loop}
                                    playbackRate={playbackRate}
                                    volume={volume}
                                    muted={muted}
                                    onReady={() => console.log('onReady')}
                                    onStart={this.handleStart}
                                    onPlay={this.handlePlay}
                                    onPause={this.handlePause}
                                    onBuffer={() => console.log('onBuffer')}
                                    onPlaybackRateChange={this.handleOnPlaybackRateChange}
                                    onSeek={e => console.log('onSeek', e)}
                                    onEnded={this.handleEnded}
                                    onError={e => console.log('onError', e)}
                                    onProgress={this.handleProgress}
                                    onDuration={this.handleDuration}
                                    onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
                                    played30={false}
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
                                        <img src={channel?.snippet.thumbnails.default.url} alt='icon'
                                             height={avatarSize}
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
                                    <a onClick={() => {
                                        openInNewTab(titleLink)
                                    }}
                                       style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                                        {video.title}
                                    </a>
                                    <div style={{marginTop: 3}}>
                                        <a onClick={() => {
                                            openInNewTab(channelLink)
                                        }}
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
                </React.Fragment>
            )
        }
    }

    return <Player/>

}
export default MainVideoPlayer
