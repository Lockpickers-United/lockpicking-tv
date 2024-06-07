import React from 'react'
import Typography from '@mui/material/Typography'
import ToggleColorMode from './ToggleColorMode'

function Footer({extras}) {

    return (
        <Typography align='center' component='div' style={{marginTop: 16, marginBottom: 80, color:'#121212'}}>
            <a href='https://www.youtube.com/@LockPickersUnited' target='_blank' rel='noopener noreferrer' style={{color:'#121212'}}>
                LPU YouTube
            </a>
            &nbsp;•&nbsp;
            <a href='https://discord.gg/lockpicking' target='_blank' rel='noopener noreferrer' style={{color:'#121212'}}>
                LPU Discord
            </a>
            &nbsp;•&nbsp;
            <a href='https://www.reddit.com/r/lockpicking/' target='_blank' rel='noopener noreferrer' style={{color:'#121212'}}>
                Reddit
            </a>

            {extras}

            <div style={{textAlign: 'center'}}>
                {0===1 &&
                    <div style={{marginTop: '20px', display: 'flex', textAlign: 'center'}}>
                        <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                            <ToggleColorMode/>
                        </div>
                    </div>
                }
            </div>
        </Typography>
    )
}

export default Footer
