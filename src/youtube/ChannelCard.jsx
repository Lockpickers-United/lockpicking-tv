import React, {useCallback, useEffect, useRef, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import queryString from 'query-string'
import Tracker from '../app/Tracker.jsx'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowSize from '../util/useWindowSize.jsx'
import OpenYouTubeLinkButton from './OpenYouTubeLinkButton.jsx'
import ChannelStats from './ChannelStats.jsx'


import {styled} from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {red} from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'

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


const Channel = ({channel, onExpand}) => {

    const descriptionLines = channel.description.split('\n')

    const style = {
        marginRight: 20,
        marginBottom: 20,
        borderBottom: '1px solid #444',
        textAlign: 'left'
    }

    const {width} = useWindowSize()
    const smallWindow = width <= 480

    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    return (
        <Card sx={{backgroundColor:'rgb(26, 32, 39)'}}>
            <CardContent syle={{}}>
                <div style={{height: 60, marginBottom:10}}>
                    <img src={channel.thumbnail} alt={channel.title} height='60' width='60'
                         style={{borderRadius: '50%', overflow: 'hidden', fontSize: '.7rem'}}/>
                </div>
                <div style={{
                    fontSize: '1.1rem', fontWeight: 600
                }}>
                    {channel.title}
                </div>

                <ChannelStats channel={channel}/>

            </CardContent>
            <CardActions disableSpacing>
                <OpenYouTubeLinkButton channel={channel} fontSize={'small'}/>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent style={{textAlign:'left', padding:5}}>
                    {channel.description &&
                        descriptionLines.map((line, index) =>
                            <div key={index} style={{marginLeft: 25}}>
                                {line}<br/>
                            </div>
                        )
                    }
                    {!channel.description &&
                        <div style={{width: '100%', textAlign: 'center', marginBottom: 10, fontStyle: 'italic'}}>
                            no channel details available<br/>
                        </div>

                    }
                    <Tracker feature='channel' id={channel.id} title={channel.title}/>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Channel
