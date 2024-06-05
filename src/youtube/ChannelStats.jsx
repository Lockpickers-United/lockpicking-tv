import FieldValue from '../util/FieldValue.jsx'
import Typography from '@mui/material/Typography'
import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'

const ChannelStats = ({channel}) => {

    const {width} = useWindowSize()
    const smallWindow = width <= 500
    const statMargin = smallWindow ? 0 : 0
    const flexStyle = smallWindow ? {display: 'flex',marginTop: 10} : {display: 'flex', marginTop: 6}

    function abbreviate(number) {
        return new Intl.NumberFormat( 'en-US', { maximumFractionDigits: 1,notation: 'compact' , compactDisplay: 'short' }).format(number)
    }

    if (!channel) {
        return null
    }
    return (
        <div style={{...flexStyle, width:'100%', textAlign:'center'}}>
            <FieldValue
                name='subscribers'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                }}>{abbreviate(channel.subscriberCount)}</Typography>}
            headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: statMargin, flexGrow:1}}
            />
            <FieldValue
                name='videos'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                    }}>{abbreviate(channel.videoCount)}</Typography>}
                headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: statMargin, flexGrow:1}}
            />
            <FieldValue
                name='views'
                value={<Typography
                    style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.25
                    }}>{abbreviate(channel.viewCount)}</Typography>}
                headerStyle={{color: '#bbb'}}
                textStyle={{color: '#eee'}}
                style={{marginRight: 0, flexGrow:1}}
            />
        </div>
    )

}

export default ChannelStats