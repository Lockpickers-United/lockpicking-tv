import React from 'react'
import Typography from '@mui/material/Typography'
import ToggleColorMode from './ToggleColorMode'
import {openInNewTab} from '../util/openInNewTab'


function Footer({extras}) {

    return (
        <Typography align='center' component='div' style={{marginTop: 16, marginBottom: 80, color: '#121212'}}>
            <a onClick={() => {
                openInNewTab('https://www.youtube.com/@LockPickersUnited')
            }} style={{color: '#121212', cursor: 'pointer', textDecoration: 'underline'}}>
                LPU YouTube
            </a>
            &nbsp;•&nbsp;
            <a onClick={() => {
                openInNewTab('https://discord.gg/lockpicking')
            }} style={{color: '#121212', cursor: 'pointer', textDecoration: 'underline'}}>
                LPU Discord
            </a>
            &nbsp;•&nbsp;
            <a onClick={() => {
                openInNewTab('https://www.reddit.com/r/lockpicking')
            }} style={{color: '#121212', cursor: 'pointer', textDecoration: 'underline'}}>
                Reddit
            </a>

            {extras}

            <div style={{textAlign: 'center'}}>
                {0 === 1 &&
                    <div style={{marginTop: '20px', display: 'flex', textAlign: 'center'}}>
                        <div style={{marginRight: 'auto', marginLeft: 'auto'}}>
                            <ToggleColorMode/>
                        </div>
                    </div>
                }
            </div>

            <img alt='LPTV' src='/i/temp.gif' height={0} width={0} id='trackImage'/>
        </Typography>
    )
}

export default Footer
