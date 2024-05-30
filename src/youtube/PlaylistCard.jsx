import React, {useContext, useEffect, useRef, useState} from 'react'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'

import queryString from 'query-string'
import useWindowSize from '../util/useWindowSize.jsx'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import Button from '@mui/material/Button'

const PlaylistCard = ({playlist, expanded}) => {

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

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
    const avatarMargin = smallWindow ? '0px 10px 0px 0px' : '0px 10px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'left'
    const channelUrl = `https://www.youtube.com/channel/${channel?.id}`
    const playlistUrl = `https://www.youtube.com/playlist?list=${playlist.id}`

    const textColor = '#fff'

    return (
        <Card style={{backgroundColor: '#1A2027', boxShadow: 'unset', padding: '0px', color: textColor}} ref={ref}>
            <CardContent style={{padding: '5px 0px 5px 0px', textAlign: 'center'}}>

                <div style={{
                    height: 200,
                    marginTop: 5,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    backgroundImage: `url(${playlist.thumbnail})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    placeItems: 'center',
                    backgroundColor: '#000'
                }}>
                    <Button variant='filled' startIcon={<PlaylistPlayIcon/>}
                            style={{
                                backgroundColor: '#000',
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                border: '1px solid #bbb',
                                borderRadius: 10
                            }}
                            onClick={() => {openInNewTab(playlistUrl)}}>
                        {playlist.itemCount} videos
                    </Button>
                </div>
                <div style={headerFlexStyle}>
                    <div style={{height: avatarSize, margin: avatarMargin}}>
                        <img src={channel?.thumbnail} alt='icon' height={avatarSize} width={avatarSize}
                             style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                    </div>
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3rem',
                        fontWeight: 600,
                        textAlign: nameAlign,
                        flexGrow: 1
                    }}>
                        <div style={{fontSize: '0.95rem', fontWeight: 400, marginBottom: 3}}>
                            <a href={channelUrl} target='_blank' rel='noopener noreferrer'
                               style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem'}}>
                                {channel?.title}
                            </a>
                        </div>
                        <a href={playlistUrl} target='_blank' rel='noopener noreferrer'
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
