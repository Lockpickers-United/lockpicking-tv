import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LoadingContext from '../youtubeContext/LoadingContext.jsx'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import queryString from 'query-string'
import useWindowSize from '../util/useWindowSize.jsx'
import {useNavigate} from 'react-router-dom'

const PlaylistCard = ({playlist, expanded}) => {
    const navigate = useNavigate()

    const {getSectionFromPlaylistId, getChannelFromId} = useContext(LoadingContext)
    const playlistPage = getSectionFromPlaylistId(playlist.id)

    const playlistPageUrl = playlistPage?.parentId
        ? `/playlist?page=${playlistPage.sectionId}&name=${playlistPage.sectionName}`
        : null

    const handleClick = useCallback(() => {
        navigate(playlistPageUrl)
    }, [navigate, playlistPageUrl])

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

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

    const channel = getChannelFromId(playlist.channelId)
    const playlistItemText = playlist.itemCount > 1
        ? 'videos'
        : 'video'

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 40 : 50
    const avatarMargin = smallWindow ? '0px 10px 0px 0px' : '0px 10px 5px 0px'

    const headerFlexStyle = smallWindow
        ? {display: 'flex', placeItems: 'center', padding: 10}
        : {display: 'flex', placeItems: 'center', padding: 10}
    const nameAlign = smallWindow ? 'left' : 'left'
    const channelUrl = `https://www.youtube.com/channel/${channel?.id}`
    //const playlistUrl = `https://www.youtube.com/playlist?list=${playlist.id}`

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
                                backgroundColor: '#1b3872',
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                border: '1px solid #bbb',
                                borderRadius: 10,
                                boxShadow: '1px 1px #1b3872'
                            }}
                            onClick={() => {
                                handleClick()
                            }}
                    >
                        {playlist.itemCount} {playlistItemText}
                    </Button>
                </div>
                <div style={headerFlexStyle}>
                    <div style={{height: avatarSize, margin: avatarMargin}}>
                        <img src={channel?.snippet.thumbnails.default.url} alt='icon' height={avatarSize} width={avatarSize}
                             style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                    </div>
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.3rem',
                        fontWeight: 600,
                        textAlign: nameAlign,
                        flexGrow: 1
                    }}>
                        <a onClick={() => {
                            handleClick()
                        }}
                           style={{color: textColor, textDecoration: 'none', fontSize: '1.0rem', cursor: 'pointer'}}>
                            {playlist.title}
                        </a>
                        <div style={{marginTop: 0}}>
                            <a href={channelUrl} target='_blank' rel='noopener noreferrer'
                               style={{color: textColor, textDecoration: 'none', fontSize: '0.83rem', fontWeight: 400}}>
                                By: {channel?.snippet.title}
                            </a>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PlaylistCard
