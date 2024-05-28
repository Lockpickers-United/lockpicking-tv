import React, {useCallback, useEffect, useRef, useState} from 'react'
import queryString from 'query-string'
import Tracker from '../app/Tracker.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import OpenYouTubeLinkButton from './OpenYouTubeLinkButton.jsx'
import ChannelStats from './ChannelStats.jsx'

import {styled} from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

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

const Channel = ({channel, expanded, onExpand}) => {

    const [scrolled, setScrolled] = useState(false)
    const ref = useRef(null)

    const handleChange = useCallback(() => {
        onExpand(!expanded ? channel.id : false)
    }, [channel.id, expanded, onExpand])

    useEffect(() => {
        if (expanded && ref && !scrolled) {
            const isMobile = window.innerWidth <= 600
            const offset = isMobile ? 70 : 74
            const {id} = queryString.parse(location.search)
            const isIdFiltered = id === channel.id

            setScrolled(true)

            setTimeout(() => {
                window.scrollTo({
                    left: 0,
                    top: ref.current.offsetTop - offset*2,
                    behavior: isIdFiltered ? 'auto' : 'smooth'
                })
            }, isIdFiltered ? 0 : 100)
        } else if (!expanded) {
            setScrolled(false)
        }
    }, [expanded, scrolled, channel.id])

    const descriptionLines = channel.description.split('\n')
    const expandColor = channel.description ? '#bbb' : '#444'

    const link = channel.customUrl
        ? `https://www.youtube.com/${channel.customUrl}`
        : `https://www.youtube.com/channel/${channel.id}`

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const avatarSize = smallWindow ? 40 : 60
    const avatarMargin = smallWindow ? '0px 15px 0px 10px' : '0px 0px 5px 0px'

    const headerFlexStyle = smallWindow ? {display: 'flex', placeItems: 'center'} : {placeItems: 'center'}
    const nameAlign = smallWindow ? 'left' : 'center'

    return (
        <Card style={{backgroundColor: '#1A2027', boxShadow: 'unset', padding: '0px'}} ref={ref}>
            <CardContent style={{padding: '15px 5px 0px 5px', textAlign:'center'}}>
                <div style={headerFlexStyle}>
                    <div style={{height: avatarSize, margin: avatarMargin}}>
                        <img src={channel.thumbnail} alt='icon' height={avatarSize} width={avatarSize}
                             style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                    </div>
                    <div style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        textAlign: nameAlign,
                        flexGrow: 1,
                        overflow: 'hidden',
                        height: '1.5rem'
                    }}>
                        <a href={link} target='_blank' rel='noopener noreferrer' style={{color:'#fff', textDecoration:'none'}}>
                            {channel.title}
                        </a>
                    </div>
                    <OpenYouTubeLinkButton channel={channel} fontSize={'small'}/>
                </div>
            </CardContent>
            <CardActions sx={{padding: '0px 5px'}}>
                <div style={{width: '100%', display: 'flex', placeItems:'center'}}>
                    <ChannelStats channel={channel}/>
                    <ExpandMore style={{height:40}} onClick={handleChange}>
                        <ExpandMoreIcon style={{color: expandColor}} />
                    </ExpandMore>
                </div>
            </CardActions>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent style={{textAlign: 'left', padding: 10, color:'#fff'}}>
                    {channel.description &&
                        descriptionLines.map((line, index) =>
                            <div key={index} style={{marginLeft: 5}}>
                                {line}<br/>
                            </div>
                        )
                    }
                    {!channel.description &&
                        <div style={{width: '100%', textAlign: 'center', marginBottom: 10, fontStyle: 'italic'}}>
                            no channel details available<br/>
                        </div>
                    }
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Channel
